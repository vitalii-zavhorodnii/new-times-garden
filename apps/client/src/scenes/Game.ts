import { DateTime } from 'luxon';
import { Scene } from 'phaser';
import { Pinch } from 'phaser3-rex-plugins/plugins/gestures.js';
import { levelCalculator } from 'src/helpers/level-calculator';

import EventBus from '@emitter/EventBus';

import { createPayment } from '@services/createPayment';
import { harvestPlant } from '@services/harvestPlant';
import { sendTonTransaction } from '@services/sendTonTransaction';
import { startGrowPlant } from '@services/startGrowPlant';

import ShopMenu from '@components/menus/ShopMenu';

import Decoration from '@entities/Decoration';
import Dummy from '@entities/Dummy';
import Plant from '@entities/Plant';
import Soil from '@entities/Soil';

import { mapFieldRows } from '@mappers/mapFieldRows';
import { userGardenMapper } from '@mappers/mapUserGarden';

// import { elementUpdate } from '@helpers/element-update';
import { randomNumberHelper } from '@helpers/random-number';

import { CAMERA_BOUNDRIES } from '@constants/camera-bounds';
import { CONTAINERS_DEPTH } from '@constants/containers-depth';
import { DECORATION_LIST } from '@constants/decorations';
import { _EVENTS } from '@constants/events';
// import { PLANTS_SPRITES } from '@constants/plants-sprites';
import { PLANTS_ANIMATED } from '@constants/plants-sprites';
import { PLANTS_MARGIN, ROWS_GAP, ROW_MAP } from '@constants/rows.constants';

import type { IPlantListItem } from '@interfaces/IPlantListItem';
import type { IShopItem } from '@interfaces/IShopItem';
import type { ICellData, IUserData } from '@interfaces/IUserData';

interface IData {
  user: IUserData;
  shopList: IShopItem[];
  settings: any;
}

export class Game extends Scene {
  public isBlocked: boolean;
  // Utilities
  public camera: Phaser.Cameras.Scene2D.Camera;
  public pinchDistance: number;
  private growingInterval: ReturnType<typeof setInterval>;
  // User data
  private telegramId: number | string;
  private field: ICellData[][];
  private balanceCoins: number;
  private balanceTokens: number;
  private xp: number;
  private playerLevel: number;
  // Settins
  public settings: any;
  // Picked plant
  public pickedPlant: IPlantListItem;
  public growingPlant: Plant;
  // Sprites arrays and 2D arrays
  private plants: (Plant | Dummy)[][];
  private soil: Soil[][];
  private decorations: Decoration[];
  // Phaser Containers
  private decorationContainer: Phaser.GameObjects.Container;
  private fieldContainer: Phaser.GameObjects.Container[];
  private soilContainer: Phaser.GameObjects.Container[];
  // UI Elements - old fix
  private shopMenu: ShopMenu;
  private shopList: IShopItem[];

  // Constructor
  constructor() {
    super('Game');
    // Set default values for state
    this.pickedPlant = null;
    this.soilContainer = [];
    this.fieldContainer = [];
    this.decorationContainer = null;
    this.decorations = [];
    this.plants = [];
    this.soil = [];
    this.isBlocked = false;
    this.balanceCoins = 0;
    this.balanceTokens = 0;
    this.xp = 0;
    this.playerLevel = 0;
    this.telegramId = null;
  }

  public init(data: IData) {
    this.telegramId = data.user.telegramId;
    this.field = data.user.garden.field;
    this.balanceCoins = data.user.balanceCoins;
    this.balanceTokens = data.user.balanceTokens;
    this.xp = data.user.xp;
    this.playerLevel = data.user.playerLevel;
    this.settings = data.settings;
    this.shopList = data.shopList;
  }

  // Create scene method
  public create() {
    /*    Camera settings   */
    this.camera = this.cameras.main;
    const zoom = parseFloat(JSON.parse(window.localStorage.getItem('zoom')));

    if (!Number.isNaN(zoom)) {
      this.camera.setZoom(zoom, zoom);
    }
    /*
     *    Show tutorial
     */
    const skipTutorial: boolean = JSON.parse(
      window.localStorage.getItem('skip-tutorial')
    );

    console.log({ skipTutorial });
    if (!skipTutorial) {
      EventBus.emit(_EVENTS.tutorial_modal_open);
    }
    // Shop menu
    this.shopMenu = new ShopMenu(this.shopList, (item: IShopItem) => {
      this.handleShopItemClick(item);
    });
    const closeShopBtn = document.getElementById('shop-menu-close');
    closeShopBtn.addEventListener('click', () => {
      EventBus.emit(_EVENTS.shop_menu_close);
    });
    /*    Background Image    */
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - 13;

    const backgroundImage = this.add.image(centerX, centerY, 'background');
    backgroundImage.x = backgroundImage.x - 280;
    backgroundImage.y = backgroundImage.y - 118;
    /*    Create animations   */
    // Map array of animated textures {Variables}
    PLANTS_ANIMATED.forEach((sprite) => {
      this.anims.create({
        key: `tap-${sprite}-0`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 4, end: 15 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-${sprite}-1`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 16, end: 27 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-${sprite}-2`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 28, end: 39 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-${sprite}-3`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 40, end: 51 }),
        repeat: 0
      });
    });
    // Create POOF animation
    this.anims.create({
      key: 'poof',
      frameRate: 24,
      frames: this.anims.generateFrameNumbers('dummy', { start: 1, end: 12 }),
      repeat: 0
    });
    /*    Render Game Objects   */
    this.renderPlants(); // user plants
    this.renderSoil(); // soil under plants
    this.renderDecorations(); // all decorations
    /*    EventBus subscribe    */
    EventBus.on(_EVENTS.switch_to_game_scene, () => {
      EventBus.emit(_EVENTS.ring_show);
      EventBus.emit(_EVENTS.balance_show);
    }); // Handle return to Game scene
    EventBus.on(_EVENTS.player_xp_add, (value: number) => {
      this.levelHandler(value);
    }); // Handle player level
    EventBus.on(_EVENTS.esc_click, () => {
      this.isBlocked = false;
      this.pickedPlant = null;
    }); // Escape trigger
    EventBus.on(_EVENTS.shop_menu_open, () => {
      this.isBlocked = true;
    }); // Shop Coins Open
    EventBus.on(_EVENTS.shop_menu_close, () => {
      this.isBlocked = false;
    }); // Shop Coins close
    EventBus.on(_EVENTS.plant_menu_open, () => {
      this.isBlocked = true;
    }); // Plant Menu open
    EventBus.on(_EVENTS.plant_menu_close, () => {
      this.isBlocked = false;
    }); // Plant Menu close
    EventBus.on(_EVENTS.picked_plant_update, (plant: IPlantListItem) => {
      this.pickedPlant = plant;
    }); // Update data on picked plant
    EventBus.on(_EVENTS.growing_plant_clear, () => {
      this.growingPlant = null;
    });
    /*    EventBus emit    */
    EventBus.emit(_EVENTS.balance_update_coins, this.balanceCoins);
    EventBus.emit(_EVENTS.balance_update_tokens, this.balanceTokens);
    EventBus.emit(_EVENTS.player_xp_update, this.xp);
    EventBus.emit(_EVENTS.player_level_update, this.playerLevel);
    EventBus.emit(_EVENTS.balance_show);
    EventBus.emit(_EVENTS.ring_show);
    // this.levelHandler(this.xp);
    /*    Post prepraing events   */
    this.initiateControls();
    // Activate interval Grow phaser checker
    this.growingInterval = setInterval(() => this.runCheckGrowPhase(), 1000);
    this.events.on('destroy', () => (this.growingInterval = null));
    /* End of create */
  }
  /*    Methods   */
  /*
   ? Game mechanics methods
   */
  // Player level handler
  private levelHandler(value: number) {
    this.xp += value;
    this.playerLevel = levelCalculator(this.xp, this.settings.levelSteps);

    EventBus.emit(_EVENTS.player_xp_update, this.xp);
    EventBus.emit(_EVENTS.player_level_update, this.playerLevel);
  }
  // Growing checker
  // Map 2D array field and run checkGrowPhase()
  private runCheckGrowPhase() {
    // Create current time before array check
    const currentTime = DateTime.now();

    this.plants.forEach((row) => {
      row.forEach((plant: Plant) => {
        if (!plant.dummy && plant.growTime) {
          // Run check if not Dummy and has {growTime}
          this.checkGrowPhase(plant, currentTime);
        }
      });
    });
  }

  private checkGrowPhase(plant: Plant, currentTime: DateTime) {
    // Calculate how much left percents till end
    const endTime = DateTime.fromMillis(plant.plantedAt + plant.growTime);
    const difference = endTime.diff(currentTime).toMillis();
    const percentLeft = Math.floor((difference / plant.growTime) * 100);
    // Run change phases, animations
    // - Run change phases, animations
    let newPhase: number;
    let frame: number;
    let animationPrefix = `tap-${plant.title.toLowerCase()}`;
    // - Check percentage grow and update phase
    if (percentLeft < 0) {
      newPhase = 3;
      frame = 3;
    } else if (percentLeft < 30) {
      newPhase = 2;
      frame = 2;
    } else if (percentLeft < 80) {
      newPhase = 1;
      frame = 1;
    } else {
      // - No change needed if percentLeft >= 80
      return;
    }
    // - If plant phase is not equil to newPhase
    if (plant.phase !== newPhase) {
      plant.setFrame(frame);
      plant.phase = newPhase;

      if (plant.isAnimated) {
        plant.play(`${animationPrefix}-${newPhase}`);
      }
    }
  }
  // # Ingame entities click handlers
  // - Handle user clicked on Soil sprite
  private handleSoilClick(soil: Soil) {
    // - Check if blocked canvas, stop if true
    if (this.isBlocked) return;
    // - If not occupied and no picked plant - Escape
    if (!soil.isOccupied && !this.pickedPlant) {
      // - Clear growing plant info bar
      EventBus.emit(_EVENTS.growing_plant_clear);
      EventBus.emit(_EVENTS.ring_set_menu);

      return;
    }
    // - Check if Soil is free and user picked Seed
    // - Picked seed from Seed Menu
    if (!soil.isOccupied && this.pickedPlant) {
      // - Run place plant Trigger
      this.triggerPlacePlant(soil);

      return;
    }
    // - Check if Soil is occupied by Plant
    if (soil.isOccupied) {
      // - Run trigger try to harvest crops
      this.triggerTryHarvestPlant(soil);

      return;
    }
  }
  // - Handle user clicked on Decoration sprites
  private handleDecorationClick(decoration: Decoration) {
    if (this.isBlocked) return;

    if (decoration.decorationName === 'house') {
      // Hide interface
      this.pickedPlant = null;
      EventBus.emit(_EVENTS.picked_plant_clear);
      EventBus.emit(_EVENTS.growing_plant_clear);
      EventBus.emit(_EVENTS.ring_hide);
      EventBus.emit(_EVENTS.balance_hide);

      this.scene.switch('HouseScene');
    }

    if (decoration.decorationName === 'barn') {
      // this.isBlocked = true;
      let delay = 0;

      this.soil.forEach((row) => {
        row.forEach((soil) => {
          if (!soil.plant) return;
          if (soil?.plant?.dummy) return;

          setTimeout(() => {
            this.triggerTryHarvestPlant(soil, true);
          }, delay);

          delay += 50;
        });
      });
    }
  }
  // # Ingame triggers
  // - Try to grow Plant in Soil
  private triggerPlacePlant(soil: Soil): void {
    // - Check if any currency price is higher then balance
    if (
      this.pickedPlant.gamePrice > this.balanceCoins ||
      this.pickedPlant.tokenPrice > this.balanceTokens
    ) {
      // - Clear Picked Plant
      this.pickedPlant = null;
      EventBus.emit(_EVENTS.picked_plant_clear);

      return;
    }
    // - Define plantedAt timer from luxon in ms
    const plantedAt = DateTime.now().toMillis();
    // - Defince plant from Picked Plant
    const plant = this.pickedPlant;
    const { rowIndex, plantIndex } = soil;
    // ? Update backend data
    // - POST start growing new Plant
    startGrowPlant(this.telegramId, plant._id, rowIndex, plantIndex, plantedAt);
    // ? Update in-game data
    // - Withdrow price from user balance
    this.balanceCoins -= this.pickedPlant.gamePrice;
    this.balanceTokens -= this.pickedPlant.tokenPrice;
    // - Emit Event update balance
    EventBus.emit(_EVENTS.balance_update_coins, this.balanceCoins);
    EventBus.emit(_EVENTS.balance_update_tokens, this.balanceTokens);
    // - Create props for Sprite from Soil data X and Y
    // - Pass Plant data from Store to Soil Plant Sprite
    const props = {
      x: soil.x,
      y: soil.y,
      ...plant
    };
    // - Destroy old plant by ref
    this.plants[rowIndex][plantIndex].destroy();
    // - Create new plant in Plant sprites array
    this.plants[rowIndex][plantIndex] = new Plant(this, props, plantedAt);
    // - Define new Plant from updated array
    const newPlant = this.plants[rowIndex][plantIndex] as Plant;
    // - Bind new Plant to Soil
    soil.placePlant(newPlant);
    // - Add new Plant to container Field
    this.fieldContainer[rowIndex].addAt(newPlant, plantIndex);
    // - Play Plant's animation
    if (newPlant.isAnimated) {
      newPlant.play(`tap-${newPlant.title.toLowerCase()}-0`);
    }
    // - Post planting checks
    // - Clear Picked plant if inssuficient balance
    if (
      plant.gamePrice > this.balanceCoins ||
      plant.tokenPrice > this.balanceTokens
    ) {
      this.pickedPlant = null;
      EventBus.emit(_EVENTS.picked_plant_clear);
      EventBus.emit(_EVENTS.ring_set_menu);
    }
  }
  // - Try to harvest Plant from Soil
  private triggerTryHarvestPlant(soil: Soil, skipGrowData?: boolean): void {
    // - Define data from Plant in Soil
    const { coinsIncome, xpIncome, tokensIncome, plantedAt, growTime } = soil.plant;
    const { rowIndex, plantIndex } = soil;
    // - Calculate time difference current and plantedAt time
    const currentTime = DateTime.now();
    const endTime = DateTime.fromMillis(plantedAt + growTime);
    const difference = endTime.diff(currentTime).toMillis();
    const percentLeft = Math.floor((difference / growTime) * 100);
    // - Check if completed Plant growing,
    // - If percent growing left - show Plant growing data
    if (percentLeft > 0 && !this.pickedPlant && !skipGrowData) {
      // - Emit Event clear picked and upate growing plant data
      EventBus.emit(_EVENTS.ring_set_escape);
      EventBus.emit(_EVENTS.picked_plant_clear);
      EventBus.emit(_EVENTS.growing_plant_update, soil.plant);
      // - Play animation
      if (soil.plant.isAnimated) {
        soil.plant.play(`tap-${soil.plant.title.toLowerCase()}-${soil.plant.phase}`);
      }

      return;
    }
    // - Check if growing, plany animation if not ready
    if (percentLeft > 0) {
      // - Play animation
      if (soil.plant.isAnimated) {
        soil.plant.play(`tap-${soil.plant.title.toLowerCase()}-${soil.plant.phase}`);
      }

      return;
    }
    // - Check if not percent left
    // - Return if picked plant but ready
    if (percentLeft < 0 && this.pickedPlant) {
      // - Play animation
      if (soil.plant.isAnimated) {
        soil.plant.play(`tap-${soil.plant.title.toLowerCase()}-${soil.plant.phase}`);
      }

      return;
    }
    // ? Update backend data
    // -  POST data to harvest on Server
    harvestPlant(this.telegramId, rowIndex, plantIndex);
    // ? Update in-game data
    // - Update user balance in Game
    this.balanceCoins += coinsIncome;
    this.balanceTokens += tokensIncome;
    // - Emit Events
    EventBus.emit(_EVENTS.growing_plant_clear);
    EventBus.emit(_EVENTS.ring_set_menu);
    EventBus.emit(_EVENTS.balance_update_coins, this.balanceCoins);
    EventBus.emit(_EVENTS.balance_update_tokens, this.balanceTokens);
    EventBus.emit(_EVENTS.player_xp_add, xpIncome);
    // - Remove Plant from container Field
    this.fieldContainer[rowIndex].remove(this.plants[rowIndex][plantIndex]);
    // - Destroy old sprite Plant
    this.plants[rowIndex][plantIndex].destroy();
    // - Set Plant to Dummy in Plants 2D array
    this.plants[rowIndex][plantIndex] = new Dummy(this, soil.x, soil.y) as Plant;
    const dummy = this.plants[rowIndex][plantIndex] as Plant;
    // - Set first frame to display
    dummy.setFrame(0);
    // - Bind dummy to Soil
    soil.placePlant(dummy);
    // - Update texture to harvested after harvest
    soil.setTexture('harvested');
    // - Add Dummy plant to container Field
    this.fieldContainer[rowIndex].addAt(dummy, plantIndex);
    // - Play poof animation of Dummy
    soil.plant.play('poof').once('animationcomplete', () => {
      soil.plant.setFrame(0);
    });
  }
  // # Input and controls
  // - Initiate controls
  private initiateControls() {
    const pinch = new Pinch(this);
    pinch.setEnable(true);

    pinch.on('pinch', () => {
      if (!this.pinchDistance) {
        this.pinchDistance = pinch.distanceBetween;
        return;
      }

      if (this.pinchDistance > pinch.distanceBetween) {
        const zoom = pinch.scaleFactor * this.camera.zoom;
        if (zoom > 0.65) {
          this.camera.setZoom(zoom, zoom);
        }
      }
      if (this.pinchDistance < pinch.distanceBetween) {
        const zoom = pinch.scaleFactor * this.camera.zoom;
        if (zoom < 1.1) {
          this.camera.setZoom(zoom, zoom);
        }
      }

      this.pinchDistance = pinch.distanceBetween;
    });

    pinch.on('pinchend', () => {
      const zoom = pinch.scaleFactor * this.camera.zoom;
      window.localStorage.setItem('zoom', JSON.stringify(zoom));
      this.pinchDistance = null;
    });

    this.input.on('pointermove', (p) => {
      if (!p.isDown) return;

      const distance = p.x - p.prevPosition.x;

      if (distance >= -1 && distance <= 1) return;

      if (this.pinchDistance) return;

      const { scrollX } = this.camera;
      const { left, right } = CAMERA_BOUNDRIES;

      this.camera.scrollX -= distance * 2;

      if (scrollX <= left) {
        this.camera.scrollX = left + 5;
      }

      if (scrollX >= right) {
        this.camera.scrollX = right - 5;
      }
    });
  }
  // # Render methods
  // - Render Plants sprites from field data
  private renderPlants(): void {
    // Define center for canvas with {PLANTS_MARGIN}
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - PLANTS_MARGIN;
    // Mapping user garden
    const field = userGardenMapper(this.field);
    // Create sprites from user data
    this.plants = field.map((gardenRow) => {
      // Array of created sprites
      // Return Dummy or Plant
      return gardenRow.map((cell) => {
        // If cell has not planted time
        if (!cell.plantedAt) {
          // Plant Dummy
          const dummy = new Dummy(this, cell.plant.x, cell.plant.y);
          dummy.setFrame(0);
          return dummy;
        }
        // Create props DTO
        const props = {
          ...cell.plant,
          plantedAt: cell.plantedAtClient
        };
        // Return Plant sprite
        return new Plant(this, props, cell.plantedAt);
      });
    });
    // Fill container with sprites
    this.plants.forEach((row, index) => {
      // Create container for row of Plants/Dummy
      // Use gap for ajust height
      const container = this.add.container(
        centerX + (index - 2) * ROWS_GAP.x,
        centerY + (index - 2) * ROWS_GAP.y
      );
      // Set Depth from {CONTAINERS_DEPTH}
      container.setDepth(CONTAINERS_DEPTH.plant);
      // Push container to Field container
      this.fieldContainer.push(container);
      this.fieldContainer[index].add(row);
    });
    // Run check grow phase
    // Update animations
    this.runCheckGrowPhase();
  }
  // - Render Soils sprites from user data
  private renderSoil(): void {
    // - Define center of canvas
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;
    // Create soil postions
    const soilPositions = mapFieldRows(ROW_MAP);
    // Create Soil sprites in 2D Rray
    this.soil = soilPositions.map((row, rowIndex: number) => {
      // Return row of Soils
      return row.map(({ x, y }, soilIndex: number) => {
        // Generate random soil texture Index
        const i = randomNumberHelper(0, 5);
        // Create new Soil sprite
        // Set random frame and enable interactive
        const soil = new Soil(this, x, y, rowIndex, soilIndex);
        soil.setFrame(i);
        soil.setInteractive(this.input.makePixelPerfect());
        // Get plant equil to Soil indexes
        const plant = this.plants[rowIndex][soilIndex];
        // Place Plant in Soil
        if (!plant['dummy']) {
          soil.placePlant(plant as Plant);
        }
        // Add event handler to Soil sprite
        soil.on('pointerdown', () => {
          this.handleSoilClick(soil);
        });
        // Return
        return soil;
      });
    });
    // Create containers for Soil
    this.soil.forEach((row, index) => {
      // Create container with gap coof
      const container = this.add.container(
        centerX + (index - 2) * ROWS_GAP.x,
        centerY + (index - 2) * ROWS_GAP.y
      );
      // Set Depth to soil from {CONTAINERS_DEPTH}
      container.setDepth(CONTAINERS_DEPTH.soil);
      // Push Sprites to Soil Container
      this.soilContainer.push(container);
      this.soilContainer[index].add(row);
    });
  }
  // - Render Decorations sprites from constatns list
  // ! Need refactor
  private renderDecorations(): void {
    this.decorations = DECORATION_LIST.map(
      ({ texture, decorationName, x, y, scale }) => {
        const decoration = new Decoration(
          this,
          x,
          y,
          decorationName,
          texture,
          scale
        );

        decoration.setInteractive(this.input.makePixelPerfect());

        decoration.on('pointerdown', () => {
          this.handleDecorationClick(decoration);
        });

        return decoration;
      }
    );

    const { height, width, worldView } = this.cameras.main;
    const positionX = worldView.x + width / 2;
    const positionY = worldView.y + height / 2;

    this.decorationContainer = this.add.container(positionX, positionY);

    this.decorationContainer.setDepth(CONTAINERS_DEPTH.backgDecor);
    this.decorationContainer.add(this.decorations);
  }
  // # Utils
  // ! Refactoring or rework functions
  // ! Need rework on web components
  private async handleShopItemClick(item: IShopItem) {
    const boc = await sendTonTransaction(item.price);

    if (boc) {
      const updatedValue = this.balanceTokens + item.value;
      this.balanceTokens = updatedValue;
      // this.balanceBar.setTokens(updatedValue);

      createPayment({
        productId: item._id,
        userId: String(this.telegramId),
        boc
      });

      EventBus.emit(_EVENTS.shop_menu_close);
      // this.shopMenu.close();
      this.isBlocked = false;
    }
  }
}
