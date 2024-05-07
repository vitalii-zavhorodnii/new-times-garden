import { DateTime } from 'luxon';
import { Scene } from 'phaser';
import { Pinch } from 'phaser3-rex-plugins/plugins/gestures.js';

import { createPayment } from '@services/createPayment';
import { harvestPlant } from '@services/harvestPlant';
import { sendTonTransaction } from '@services/sendTonTransaction';
import { startGrowPlant } from '@services/startGrowPlant';

import BalanceBar from '@ui/bars/BalanceBar';
import BottomBar from '@ui/bars/BottomBar';
import PickedPlantBar from '@ui/bars/PickedPlantBar';
import PlantsMenu from '@ui/menus/PlantsMenu';
import ShopMenu from '@ui/menus/ShopMenu';

import Decoration from '@entities/Decoration';
import Dummy from '@entities/Dummy';
import Plant from '@entities/Plant';
import Soil from '@entities/Soil';

import { mapFieldRows } from '@mappers/mapFieldRows';

import { randomNumberHelper } from '@helpers/random-number';

import { CAMERA_BOUNDRIES } from '@constants/camera-bounds';
import { CONTAINERS_DEPTH } from '@constants/containers-depth';
import { DECORATION_LIST } from '@constants/decorations';
import { PLANTS_ANIMATED } from '@constants/plants-sprites';
import { PLANTS_MARGIN, ROWS_GAP, ROW_MAP } from '@constants/rows.constants';

import type { IPlantListItem } from '@interfaces/IPlantListItem';
import type { IShopItem } from '@interfaces/IShopItem';
import type { IUserData } from '@interfaces/IUserData';

interface IData {
  user: IUserData;
  plants: IPlantListItem[];
  shopList: IShopItem[];
  settings: any;
}

export class Game extends Scene {
  public camera: Phaser.Cameras.Scene2D.Camera;
  public isBlocked: boolean;
  public pinchDistance: number;
  public settings: any;
  private pickedPlant: IPlantListItem;

  // private plantsCollection: Array<Plant>;
  // private plantsCollection: Array<Seed>;
  private user: IUserData;
  private plantsData: IPlantListItem[];
  private shopList: IShopItem[];

  private plants: (Plant | Dummy)[][];
  private soil: Soil[][];
  private decorations: Decoration[];
  private growingInterval: ReturnType<typeof setInterval>;

  private decorationContainer: Phaser.GameObjects.Container;
  private gardenContainer: Phaser.GameObjects.Container[];
  private soilContainer: Phaser.GameObjects.Container[];

  private pickedPlantBar: PickedPlantBar;
  private bottomBar: BottomBar;
  private balanceBar: BalanceBar;
  private shopMenu: ShopMenu;
  // private menuDecoration: any;
  private menuPlants: PlantsMenu;
  // private menuFfertilizer: any;

  // UI buttons
  private btnShopOpen: HTMLElement;
  private btnShopClose: HTMLElement;
  private btnPlantsOpen: HTMLElement;
  private btnPlantsClose: HTMLElement;
  private btnDecorate: HTMLElement;
  private btnFertilizer: HTMLElement;

  constructor() {
    super('Game');

    this.pickedPlant = null;
    this.soilContainer = [];
    this.gardenContainer = [];
    this.decorationContainer = null;
    this.decorations = [];
    this.plants = [];
    this.soil = [];
    this.isBlocked = false;
  }

  public init(data: IData) {
    this.user = data.user;
    this.plantsData = data.plants;
    this.shopList = data.shopList;
    this.settings = data.settings;
  }

  // Create scene method
  public create() {
    this.camera = this.cameras.main;
    const zoom = parseFloat(JSON.parse(window.localStorage.getItem('zoom'))) || 1;
    this.camera.setZoom(zoom, zoom);
    // center canvas variables
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - 13;
    /*
      UI - elements
    */
    // Top right Balance bar
    this.balanceBar = new BalanceBar();
    this.balanceBar.setCoins(this.user.balanceCoins);
    this.balanceBar.setTokens(this.user.balanceTokens);
    this.balanceBar.setLevel(this.user.xp);
    this.balanceBar.show();
    // Bottom buttons bar
    this.bottomBar = new BottomBar();
    this.bottomBar.show();
    /* 
      Menus
    */
    // Shop tokens menu
    this.shopMenu = new ShopMenu(this.shopList, (item: IShopItem) =>
      this.handleShopItemClick(item)
    );

    /*
     * UI buttons and menus defining
     * Finding by id
     * find buttons and add listeners
     */
    // Tokens and coins menu
    this.btnShopOpen = document.getElementById('shop-menu-open');
    this.btnShopOpen.addEventListener('click', () => this.handleOpenShop());
    this.btnShopClose = document.getElementById('shop-menu-close');
    this.btnShopClose.addEventListener('click', () => this.handleCloseShop());
    // Plants menu
    this.btnPlantsOpen = document.getElementById('plants-menu-open');
    this.btnPlantsOpen.addEventListener('click', () => this.handlePlantsBtn());
    this.btnPlantsClose = document.getElementById('plants-menu-close');
    this.btnPlantsClose.addEventListener('click', () => this.handlePlantsBtn());
    // Fertilizers menu
    this.btnDecorate = document.getElementById('decorate');
    this.btnFertilizer = document.getElementById('fertilizer');
    this.btnDecorate.addEventListener('click', () => this.handleDecorateBtn());
    this.btnFertilizer.addEventListener('click', () => this.handleFertilizerBtn());
    /*
     * Render background and decors
     */
    const backgroundImage = this.add.image(centerX, centerY, 'background');
    backgroundImage.x = backgroundImage.x - 280;
    backgroundImage.y = backgroundImage.y - 118;
    // backgroundImage.setDisplaySize(backgroundImage.width, height);
    this.pickedPlantBar = new PickedPlantBar();
    /*
      Create animations
    */
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

    /*
     * Run fetch data methods
     * Run render game
     */
    this.renderPlantsList();
    this.renderPlantsField();
    /* End of create */
  }
  /*
      Methods
  */
  // Controls
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
        if (zoom < 1.2) {
          this.camera.setZoom(zoom, zoom);
        }

        // this.camera.setZoom(1, 1);
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
      if (p.x - p.prevPosition.x >= -1 && p.x - p.prevPosition.x <= 1) {
        console.log(
          'false ',
          p.x - p.prevPosition.x,
          p.x - p.prevPosition.x >= -1 || p.x - p.prevPosition.x <= 1
        );
        return;
      }
      if (this.pinchDistance) return;
      console.log('scroll', this.camera.scrollX);
      console.log('dist', p.x - p.prevPosition.x);
      const { scrollX } = this.camera;
      const { left, right } = CAMERA_BOUNDRIES;

      const distance = p.x - p.prevPosition.x;

      this.camera.scrollX -= distance;

      if (scrollX <= left) {
        this.camera.scrollX = left + 5;
      }

      if (scrollX >= right) {
        this.camera.scrollX = right - 5;
      }
    });
  }
  // Growing checker
  private growingChecker() {
    const currentTime = DateTime.now();

    this.plants.forEach((row) => {
      row.forEach((plant: Plant) => {
        if (!plant.dummy && plant.growTime) {
          this.updateGrowPhase(plant, currentTime);
        }
      });
    });
  }
  // Handle plant texutre by grow phase
  private updateGrowPhase(plant: Plant, currentTime: DateTime) {
    const endTime = DateTime.fromMillis(plant.plantedAt + plant.growTime);
    const diff1 = endTime.diff(currentTime).toMillis();
    const percentLeft = Math.floor((diff1 / plant.growTime) * 100);

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
  }
  // Handle clicks on soil
  private handleSoilClick(soil: Soil, rowIndex: number, plantIndex: number) {
    if (!this.isBlocked) {
      if (soil.isOccupied && this.pickedPlant) {
        this.pickedPlant = null;
        this.isBlocked = false;
        this.menuPlants.close();
        this.pickedPlantBar.hide();

        return;
      }

      if (soil.isOccupied) {
        if (PLANTS_ANIMATED.includes(soil.plant.title.toLowerCase())) {
          soil.plant.play(
            `tap-${soil.plant.phase}-${soil.plant.title.toLowerCase()}`
          );
        }

        const currentTime = DateTime.now();
        const endTime = DateTime.fromMillis(
          soil.plant.plantedAt + soil.plant.growTime
        );
        const diff1 = endTime.diff(currentTime).toMillis();
        const percentLeft = Math.floor((diff1 / soil.plant.growTime) * 100);

        if (percentLeft > 0) {
          return;
        }

        this.user.balanceCoins += soil.plant.coinsIncome;
        this.balanceBar.setCoins(this.user.balanceCoins);
        this.user.balanceTokens += soil.plant.tokensIncome;
        this.balanceBar.setTokens(this.user.balanceTokens);
        this.user.xp += soil.plant.xpIncome;
        this.balanceBar.setLevel(this.user.xp);

        this.gardenContainer[rowIndex].remove(this.plants[rowIndex][plantIndex]);
        this.plants[rowIndex][plantIndex].destroy();

        this.plants[rowIndex][plantIndex] = new Dummy(this) as Plant;
        const dummy = this.plants[rowIndex][plantIndex] as Plant;

        soil.placePlant(dummy);

        this.gardenContainer[rowIndex].addAt(dummy, plantIndex);

        harvestPlant(this.user.telegramId, rowIndex, plantIndex);

        return;
      }

      if (!soil.isOccupied && this.pickedPlant) {
        this.plantNewSeed(soil, this.pickedPlant, rowIndex, plantIndex);
      }
    }
  }
  // Handle decoration click
  private handleDecorationClick(decoration: Decoration) {
    if (decoration.decorationName === 'haus') {
      this.scene.switch('HouseScene');
    }
  }
  // Handle planing process
  private async plantNewSeed(
    soil: Soil,
    plant: IPlantListItem,
    rowIndex: number,
    plantIndex: number
  ) {
    if (
      plant.gamePrice > this.user.balanceCoins ||
      plant.tokenPrice > this.user.balanceTokens
    ) {
      this.pickedPlant = null;
      this.pickedPlantBar.hide();
      return;
    }

    this.user.balanceCoins -= plant.gamePrice;
    this.user.balanceTokens -= plant.tokenPrice;
    this.balanceBar.setCoins(this.user.balanceCoins);
    this.balanceBar.setTokens(this.user.balanceTokens);

    const plantedAt = DateTime.now().toMillis();

    startGrowPlant(this.user.telegramId, plant._id, rowIndex, plantIndex, plantedAt);

    const props = {
      x: soil.x,
      y: soil.y,
      ...plant
    };

    this.plants[rowIndex][plantIndex] = new Plant(this, props, plantedAt);

    const newPlant = this.plants[rowIndex][plantIndex] as Plant;

    soil.placePlant(newPlant);

    this.gardenContainer[rowIndex].addAt(newPlant, plantIndex);

    if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
      newPlant.play(`tap-0-${newPlant.title.toLowerCase()}`);
    }

    if (
      plant.gamePrice > this.user.balanceCoins ||
      plant.tokenPrice > this.user.balanceTokens
    ) {
      this.pickedPlant = null;
      this.pickedPlantBar.hide();
      return;
    }
  }
  /*
      Render methods
      Render garden field
  */
  // Render garden field
  private renderPlantsField() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - PLANTS_MARGIN;

    this.plants = this.user.garden.field.map((gardenRow) => {
      const plantedRow = gardenRow.map((item) => {
        if (!item.plantedAt) {
          return new Dummy(this);
        }

        const props = {
          ...item.plant,
          plantedAt: item.plantedAtClient
        };

        const plant = new Plant(this, props, item.plantedAt);

        return plant;
      });

      return plantedRow;
    });

    // added rows to container
    this.plants.forEach((row, index) => {
      const container = this.add.container(
        centerX + (index - 2) * ROWS_GAP.x,
        centerY + (index - 2) * ROWS_GAP.y
      );

      container.depth = CONTAINERS_DEPTH.plant;

      this.gardenContainer.push(container);
      this.gardenContainer[index].add(row);
    });

    this.growingChecker();

    this.renderSoil(this.plants);
  }
  // Rener soil
  private renderSoil(plants: (Plant | Dummy)[][]) {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    this.soil = mapFieldRows(ROW_MAP).map((row, rowIndex: number) => {
      const soilRow = row.map(({ x, y }, soilIndex: number) => {
        const i = randomNumberHelper(0, 5);

        const soil = new Soil(this, x, y);
        soil.setFrame(i);
        soil.setInteractive(this.input.makePixelPerfect());

        const plant = plants[rowIndex][soilIndex];

        if (!plant['dummy']) {
          soil.placePlant(plant as Plant);
        }

        soil.on('pointerdown', () => {
          this.handleSoilClick(soil, rowIndex, soilIndex);
        });

        return soil;
      });

      return soilRow;
    });

    this.soil.forEach((row, index) => {
      const container = this.add.container(
        centerX + (index - 2) * ROWS_GAP.x,
        centerY + (index - 2) * ROWS_GAP.y
      );

      container.depth = CONTAINERS_DEPTH.soil;

      this.soilContainer.push(container);
      this.soilContainer[index].add(row);
    });

    this.renderDecorations();
  }
  // Render decorations
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

    this.renderCompletion();
  }

  // action on end of renders
  private renderCompletion() {
    this.initiateControls();

    this.growingInterval = setInterval(() => this.growingChecker(), 2000);
    this.events.on('destroy', () => (this.growingInterval = null));
  }
  // Render plants list
  private renderPlantsList() {
    this.menuPlants = new PlantsMenu(this.plantsData, (plant: IPlantListItem) =>
      this.handleSeedChoose(plant)
    );
  }
  /*
      Bottom menu handlers
      Handle button click: Shop
  */
  // handle Seeds menu
  private handleSeedChoose(plant: IPlantListItem) {
    if (this.user.balanceCoins < plant.gamePrice) {
      return;
    }
    if (this.user.balanceTokens < plant.tokenPrice) {
      return;
    }

    this.pickedPlant = plant;
    this.pickedPlantBar.show(this.pickedPlant);
    this.menuPlants.close();
    this.isBlocked = false;
  }
  // Handle shops items
  private async handleShopItemClick(item: IShopItem) {
    const boc = await sendTonTransaction(item.price);

    if (boc) {
      const updatedValue = this.user.balanceTokens + item.value;
      this.user.balanceTokens = updatedValue;
      this.balanceBar.setTokens(updatedValue);

      createPayment({
        productId: item._id,
        userId: String(this.user.telegramId),
        boc
      });

      this.shopMenu.close();
      this.isBlocked = false;
    }
  }
  // Handle button add coins
  private handleOpenShop() {
    this.shopMenu.open();
    this.isBlocked = true;
  }
  private handleCloseShop() {
    this.shopMenu.close();
    this.isBlocked = false;
  }
  // Handle button click: Plants
  private handlePlantsBtn() {
    if (this.menuPlants.isOpen || this.pickedPlant) {
      this.pickedPlant = null;
      this.isBlocked = false;
      this.menuPlants.close();
      this.pickedPlantBar.hide();

      return;
    }

    this.pickedPlant = null;
    this.isBlocked = true;
    this.menuPlants.open();
    this.pickedPlantBar.hide();
  }
  // Handle button click: Fertilizer
  private handleFertilizerBtn() {
    console.log('handleFertilizerBtn');
  }
  // Handle button click: Decorattions
  private handleDecorateBtn() {
    console.log('handleDecorateBtn');
  }
}
