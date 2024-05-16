import { DateTime } from 'luxon';
import { Scene } from 'phaser';
import { Pinch } from 'phaser3-rex-plugins/plugins/gestures.js';

import EventBus from '@emitter/EventBus';

import { createPayment } from '@services/createPayment';
import { harvestPlant } from '@services/harvestPlant';
import { sendTonTransaction } from '@services/sendTonTransaction';
import { startGrowPlant } from '@services/startGrowPlant';

import PlantsMenu from '@components/menus/PlantsMenu';
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

import type { IPlantListItem, IPlantsList } from '@interfaces/IPlantListItem';
import type { IShopItem } from '@interfaces/IShopItem';
import type { ICellData, IUserData } from '@interfaces/IUserData';

interface IData {
  user: IUserData;
  plants: IPlantsList;
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
  private userId: number | string;
  private field: ICellData[][];
  private balanceCoins: number;
  private balanceTokens: number;
  private xp: number;
  // Settins
  public settings: any;
  // Picked plant
  public pickedPlant: IPlantListItem;
  // Sprites arrays and 2D arrays
  private plants: (Plant | Dummy)[][];
  private soil: Soil[][];
  private decorations: Decoration[];
  // Phaser Containers
  private decorationContainer: Phaser.GameObjects.Container;
  private fieldContainer: Phaser.GameObjects.Container[];
  private soilContainer: Phaser.GameObjects.Container[];
  // Interface elements UI

  // UI Elements - old fix
  private shopMenu: ShopMenu;
  private menuPlants: PlantsMenu;
  // UI buttons
  private btnShopClose: HTMLElement;
  private btnPlantsClose: HTMLElement;
  // private user: IUserData;
  private plantsData: IPlantsList;
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
    this.userId = null;
  }

  public init(data: IData) {
    this.userId = data.user.telegramId;
    this.field = data.user.garden.field;
    this.balanceCoins = data.user.balanceCoins;
    this.balanceTokens = data.user.balanceTokens;
    this.xp = data.user.xp;

    this.settings = data.settings;

    this.plantsData = data.plants;
    this.shopList = data.shopList;
  }

  // Create scene method
  public create() {
    /*    Camera settings   */
    this.camera = this.cameras.main;
    const zoom = parseFloat(JSON.parse(window.localStorage.getItem('zoom'))) || 1;
    this.camera.setZoom(zoom, zoom);

    /*    Old menus initialization   */
    // Plants menu
    this.menuPlants = new PlantsMenu(this.plantsData, (plant: IPlantListItem) => {
      this.handleSeedChoose(plant);
    });
    // Shop menu
    this.shopMenu = new ShopMenu(this.shopList, (item: IShopItem) => {
      this.handleShopItemClick(item);
    });
    /*    Buttons   */
    // Shop menu buttons
    this.btnShopClose = document.getElementById('shop-menu-close');
    this.btnShopClose.addEventListener('click', () => {
      this.isBlocked = false;
      EventBus.emit(_EVENTS.shop_menu_close);
    });
    // Plants menu buttons
    this.btnPlantsClose = document.getElementById('plants-menu-close');
    this.btnPlantsClose.addEventListener('click', () => {
      this.isBlocked = false;
      EventBus.emit(_EVENTS.plant_menu_close);
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
        key: `tap-0-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 4, end: 15 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-1-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 16, end: 27 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-2-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 28, end: 39 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-3-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 40, end: 51 }),
        repeat: 0
      });
    });
    // Create POOF animation
    this.anims.create({
      key: 'poof',
      frameRate: 24,
      frames: this.anims.generateFrameNumbers('dummy', { start: 1, end: 13 }),
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
    /*    EventBus emit    */
    EventBus.emit(_EVENTS.balance_update_coins, this.balanceCoins);
    EventBus.emit(_EVENTS.balance_update_tokens, this.balanceTokens);
    EventBus.emit(_EVENTS.balance_show);
    EventBus.emit(_EVENTS.ring_show);
    /*    Post prepraing events   */
    this.initiateControls();
    // Activate interval Grow phaser checker
    this.growingInterval = setInterval(() => this.runCheckGrowPhase(), 2000);
    this.events.on('destroy', () => (this.growingInterval = null));
    /* End of create */
  }
  /*    Methods   */
  /*
   *    Game mechanics methods
   */
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
    // Run change pahses, animations
    if (percentLeft < 0) {
      if (plant.phase !== 3) {
        plant.setFrame(3);
        plant.phase = 3;

        if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
          plant.play(`tap-3-${plant.title.toLowerCase()}`);
        }
      }
      return;
    }

    if (percentLeft < 30) {
      if (plant.phase !== 2) {
        plant.setFrame(2);
        plant.phase = 2;

        if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
          plant.play(`tap-2-${plant.title.toLowerCase()}`);
        }
      }
      return;
    }

    if (percentLeft < 80) {
      if (plant.phase !== 1) {
        plant.setFrame(1);
        plant.phase = 1;
        if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
          plant.play(`tap-1-${plant.title.toLowerCase()}`);
        }
      }
      return;
    }
    /* End of grow checker */
  }
  /*    Ingame Handlers   */
  // Handle user click on Soil sprite
  private handleSoilClick(soil: Soil, rowIndex: number, plantIndex: number) {
    console.log({
      blocked: this.isBlocked,
      soil: this.pickedPlant
    });
    // If interface is blocked Return
    if (this.isBlocked) return;
    // If not occupied and no picked plant - stop
    if (!soil.isOccupied && !this.pickedPlant) return;
    // Check if NOT occupied by real Plant
    // Picked Plant data from Plant menu
    if (!soil.isOccupied && this.pickedPlant) {
      // Check user balance is more then prices
      if (
        this.pickedPlant.gamePrice > this.balanceCoins ||
        this.pickedPlant.tokenPrice > this.balanceTokens
      ) {
        // Update interface fix
        this.pickedPlant = null;
        EventBus.emit(_EVENTS.picked_plant_hide);
        return;
      }
      // Update user balance
      this.balanceCoins -= this.pickedPlant.gamePrice;
      this.balanceTokens -= this.pickedPlant.tokenPrice;
      // Update Balance bar UI
      EventBus.emit(_EVENTS.balance_update_coins, this.balanceCoins);
      EventBus.emit(_EVENTS.balance_update_tokens, this.balanceTokens);
      // Place Plant in Soil from Plants Menu data
      const plantedAt = DateTime.now().toMillis();
      const plant = this.pickedPlant;
      // this.placePlantToSoil(soil, this.pickedPlant, rowIndex, plantIndex, plantedAt);
      // Create props for Sprite from Soil X and Y
      const props = {
        x: soil.x,
        y: soil.y,
        ...plant
      };
      // Place in Plants 2D array new Plant with props
      this.plants[rowIndex][plantIndex].destroy();
      this.plants[rowIndex][plantIndex] = new Plant(this, props, plantedAt);
      // Get new plant link from Plants 2D Array
      const newPlant = this.plants[rowIndex][plantIndex] as Plant;
      // Bind new Plant to this Soil
      soil.placePlant(newPlant);
      // Add new Plant to container Field
      this.fieldContainer[rowIndex].addAt(newPlant, plantIndex);
      // Plant on user garden on Server
      startGrowPlant(this.userId, plant._id, rowIndex, plantIndex, plantedAt);
      // Play Plant animation Click
      if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
        newPlant.play(`tap-0-${newPlant.title.toLowerCase()}`);
      }
      // Check balance and disable Picked Plant
      if (
        plant.gamePrice > this.balanceCoins ||
        plant.tokenPrice > this.balanceTokens
      ) {
        // Clear Picked plant
        // Hide bar
        this.pickedPlant = null;
        EventBus.emit(_EVENTS.picked_plant_hide);
        EventBus.emit(_EVENTS.ring_set_menu);
      }
      // stop continue
      return;
    }
    // Check if soil contains Plant
    if (soil.isOccupied) {
      // Animate sprite click
      if (PLANTS_ANIMATED.includes(soil.plant.title.toLowerCase())) {
        soil.plant.play(`tap-${soil.plant.phase}-${soil.plant.title.toLowerCase()}`);
      }
      // Destructuring Plant data in Soil
      const { plantedAt, growTime, coinsIncome, xpIncome, tokensIncome } =
        soil.plant;
      // Calculate procent Left to complete
      const currentTime = DateTime.now();
      const endTime = DateTime.fromMillis(plantedAt + growTime);
      const difference = endTime.diff(currentTime).toMillis();
      const percentLeft = Math.floor((difference / growTime) * 100);
      // Check if completed growing
      // if left more then 0
      // need more time to grow
      if (percentLeft > 0) return;
      // Update user balance in Game
      this.balanceCoins += coinsIncome;
      this.balanceTokens += tokensIncome;
      // Update Balance bar info
      EventBus.emit(_EVENTS.balance_update_coins, this.balanceCoins);
      EventBus.emit(_EVENTS.balance_update_tokens, this.balanceTokens);
      // this.balanceBar.updateBalance('tokens', this.balanceTokens);
      // xp rework
      this.xp += xpIncome;
      // Remove Plant from container Field
      // Destroy plant
      this.fieldContainer[rowIndex].remove(this.plants[rowIndex][plantIndex]);
      this.plants[rowIndex][plantIndex].destroy();
      // Set Plant to Dummy in Plants 2D array
      this.plants[rowIndex][plantIndex] = new Dummy(this, soil.x, soil.y) as Plant;
      // Get link to new Dummy plant
      const dummy = this.plants[rowIndex][plantIndex] as Plant;
      dummy.setFrame(0);
      // Place Dummy to Soil
      soil.placePlant(dummy);
      // Update texture to harvested after harvest
      soil.setTexture('harvested');
      // Add Dummy plant to container Field
      this.fieldContainer[rowIndex].addAt(dummy, plantIndex);
      // POST data to harvest on Server
      harvestPlant(this.userId, rowIndex, plantIndex);
      // Poof animation
      soil.plant.play('poof').once('animationcomplete', () => {
        soil.plant.setFrame(0);
      });
      // animate poof one more
      return;
    }
  }
  // Handle decoration click
  private handleDecorationClick(decoration: Decoration) {
    if (decoration.decorationName === 'house') {
      // Hide interface
      this.pickedPlant = null;
      EventBus.emit(_EVENTS.ring_hide);
      EventBus.emit(_EVENTS.balance_hide);

      this.scene.switch('HouseScene');
    }
  }

  // OLD FIX
  /*
      Bottom menu handlers
      Handle button click: Shop
  */
  // Handle shops items /
  /*    UI handlers   */
  // Handle choose Seed from Plant Shop
  private handleSeedChoose(plant: IPlantListItem) {
    // Check user balance
    if (
      this.balanceCoins < plant.gamePrice ||
      this.balanceTokens < plant.tokenPrice
    ) {
      // return if not enough
      return;
    }
    // Set picked Plant and show() Bar
    this.pickedPlant = plant;
    EventBus.emit(_EVENTS.picked_plant_show);
    EventBus.emit(_EVENTS.picked_plant_update, plant);
    // Close Plants Menu
    this.isBlocked = false;

    EventBus.emit(_EVENTS.shop_menu_close);
    EventBus.emit(_EVENTS.ring_set_escape);
  }
  /*  need rework */
  private async handleShopItemClick(item: IShopItem) {
    const boc = await sendTonTransaction(item.price);

    if (boc) {
      const updatedValue = this.balanceTokens + item.value;
      this.balanceTokens = updatedValue;
      // this.balanceBar.setTokens(updatedValue);

      createPayment({
        productId: item._id,
        userId: String(this.userId),
        boc
      });

      EventBus.emit(_EVENTS.shop_menu_close);
      // this.shopMenu.close();
      this.isBlocked = false;
    }
  }
  // Init Controls and controls Handlers
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
  /*
   *    Render game methods
   *    sprites from 2D arrays
   *    decorations
   */
  // Render plants container
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
      container.depth = CONTAINERS_DEPTH.plant;
      // Push container to Field container
      this.fieldContainer.push(container);
      this.fieldContainer[index].add(row);
    });
    // Run check grow phase
    // Update animations
    this.runCheckGrowPhase();
  }
  // Render Soil 2D Array and put Plants
  private renderSoil(): void {
    // Define center of canvas
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
        const soil = new Soil(this, x, y);
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
          this.handleSoilClick(soil, rowIndex, soilIndex);
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
      container.depth = CONTAINERS_DEPTH.soil;
      // Push Sprites to Soil Container
      this.soilContainer.push(container);
      this.soilContainer[index].add(row);
    });
  }
  // Render decorations @need work
  private renderDecorations() {
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

    this.decorationContainer.depth = CONTAINERS_DEPTH.plant;
    this.decorationContainer.add(this.decorations);
  }
  // Playground
  // Show interface
}
