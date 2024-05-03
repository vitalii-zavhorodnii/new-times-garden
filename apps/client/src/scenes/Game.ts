import throttle from 'lodash.throttle';
import { DateTime } from 'luxon';
import { Scene } from 'phaser';

import { createPayment } from '@services/createPayment';
import { harvestPlant } from '@services/harvestPlant';
import { sendTonTransaction } from '@services/sendTonTransaction';
import { startGrowPlant } from '@services/startGrowPlant';

import BalanceBar from '@ui/bars/BalanceBar';
import BottomBar from '@ui/bars/BottomBar';
import PickedPlantBar from '@ui/bars/PickedPlantBar';
import PlantsMenu from '@ui/menus/PlantsMenu';
import ShopMenu from '@ui/menus/ShopMenu';

import Dummy from '@entities/Dummy';
import Plant from '@entities/Plant';
import Soil from '@entities/Soil';

import { mapFieldRows } from '@mappers/mapFieldRows';

import { randomNumberHelper } from '@helpers/random-number';

import { CAMERA_BOUNDRIES } from '@constants/camera-boundries.constants';
import { CONTAINERS_DEPTH } from '@constants/containers-depth';
import { PLANTS_MARGIN, ROWS_GAP, ROW_MAP } from '@constants/rows.constants';

import type { IPlantListItem } from '@interfaces/IPlantListItem';
import type { IShopItem } from '@interfaces/IShopItem';
import type { IUserData } from '@interfaces/IUserData';

interface IData {
  user: IUserData;
  plants: IPlantListItem[];
  shopList: IShopItem[];
}

export class Game extends Scene {
  public camera: Phaser.Cameras.Scene2D.Camera;
  public isBlocked: boolean;

  // private balance: number;
  private pickedPlant: IPlantListItem;

  // private plantsCollection: Array<Plant>;
  // private plantsCollection: Array<Seed>;
  private userData: IUserData;
  private plantsData: IPlantListItem[];
  private shopList: IShopItem[];

  private plants: (Plant | Dummy)[][];
  private soil: Soil[][];
  private growingInterval: ReturnType<typeof setInterval>;

  private gardenContainer: Phaser.GameObjects.Container[];
  private soilContainer: Phaser.GameObjects.Container[];

  private pickedPlantBar: PickedPlantBar;
  private bottomBar: BottomBar;
  private balanceBar: BalanceBar;
  private shopMenu: ShopMenu;
  // private menuDecoration: any;
  private menuPlants: PlantsMenu;
  // private menuFfertilizer: any;

  private openShopBtn: HTMLElement;
  private closeButton: HTMLElement;
  private btnDecorate: HTMLElement;
  private btnPlants: HTMLElement;
  private closePlants: HTMLElement;
  private btnFertilizer: HTMLElement;

  constructor() {
    super('Game');

    this.pickedPlant = null;
    this.soilContainer = [];
    this.gardenContainer = [];
    this.plants = [];
    this.soil = [];
    this.isBlocked = false;
  }

  public preload() {
    const url =
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
    this.load.plugin('rexpinchplugin', url, true);
  }

  public init(data: IData) {
    this.userData = data.user;
    this.plantsData = data.plants;
    this.shopList = data.shopList;
  }

  // Create scene method
  public create() {
    this.camera = this.cameras.main;
    // center canvas variables
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - PLANTS_MARGIN;
    /*
      UI - elements
    */
    // Top right Balance bar
    this.balanceBar = new BalanceBar();
    this.balanceBar.setCoins(this.userData.balanceCoins);
    this.balanceBar.setTokens(this.userData.balanceTokens);
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
    this.openShopBtn = document.getElementById('shop-button');
    this.openShopBtn.addEventListener('click', () => this.handleOpenShop());
    this.closeButton = document.querySelector('.shop-menu__btn-close');
    this.closeButton.addEventListener('click', () => this.handleCloseShop());
    this.closePlants = document.getElementById('close-plants');
    this.closePlants.addEventListener('click', () => this.handlePlantsBtn());
    /*
      Opacity for ont completed buttons
    */
    // Find all buttons
    this.btnDecorate = document.getElementById('decorate');
    this.btnPlants = document.getElementById('plants');
    this.btnFertilizer = document.getElementById('fertilizer');
    this.btnDecorate.style.opacity = '0.5';
    this.btnFertilizer.style.opacity = '0.5';
    // Add event listeners to bottom menu buttons
    this.btnDecorate.addEventListener('click', () => this.handleDecorateBtn());
    this.btnPlants.addEventListener('click', () => this.handlePlantsBtn());
    this.btnFertilizer.addEventListener('click', () => this.handleFertilizerBtn());
    // Background
    const backgroundImage = this.add.image(centerX, centerY, 'background');
    backgroundImage.x = backgroundImage.x - 250;
    // backgroundImage.setDisplaySize(backgroundImage.width, height);
    // Run fetch data methods
    this.renderPlantsList();
    this.renderGardenField();
    // Create picked seed data
    this.pickedPlantBar = new PickedPlantBar();
    /*
      Create animations
    */
    // this.anims.add
    /* 
      Camera movement
    */
    // this.input.on('pointermove', (p) => {
    //   if (!p.isDown) return;
    //   console.log(this.camera.scrollX);
    //   console.log(p.prevPosition);

    //   const { left, right } = CAMERA_BOUNDRIES;

    //   const distance = p.x - p.prevPosition.x + 3 / this.camera.zoom;

    //   this.camera.scrollX -= distance;

    //   if (scrollX <= left) {
    //     this.camera.scrollX = left + 5;
    //   }

    //   if (scrollX >= right) {
    //     this.camera.scrollX = right - 5;
    //   }
    //   /* End control define function */
    // });
    var dragScale = this.plugins.get('rexpinchplugin').add(this);

    var camera = this.cameras.main;
    dragScale
      .on('drag1', function (dragScale) {
        const drag1Vector = dragScale.drag1Vector;
        camera.scrollX -= drag1Vector.x / camera.zoom;
        // camera.scrollY -= drag1Vector.y / camera.zoom;
      })
      .on(
        'pinch',
        function (dragScale) {
          const scaleFactor = dragScale.scaleFactor;
          camera.zoom *= scaleFactor;
        },
        this
      );

    this.events.on('destroy', () => {
      this.growingInterval = null;
    });
  }
  /*
      Methods
  */
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
    // console.log({ percentLeft });
    // console.log({ diff1, diff2 });
    // console.log({ x:  });
    // const procentGrowth = Math.floor((diff / plant.growTime) * 100) - 100;
    // console.log({
    //   frameName: parseInt(plant.frame.name),
    //   left: procentGrowth < 25,
    //   right: parseInt(plant.frame.name) !== 0
    // });
    // console.log({ procentGrowth });
    // if (procentGrowth < 25 && parseInt(plant.frame.name) !== 0) {
    //   console.log('< 25%')
    //   plant.setFrame(0);
    // } else if (procentGrowth < 60 && parseInt(plant.frame.name) !== 1) {
    //   console.log('< 60')
    //   plant.setFrame(1);
    // } else if (procentGrowth < 100 && parseInt(plant.frame.name) !== 2) {
    //   console.log('< 100%')
    //   plant.setFrame(2);
    // } else if (procentGrowth >= 100 && parseInt(plant.frame.name) !== 3) {
    //   console.log('= 100%')
    //   plant.setFrame(3);
    // }

    // plant.setFrame(2);
    // plant.setFrame(1);
    // plant.setFrame(1);
  }
  // Handle clicks on soil
  private soilClickHandler(soil: Soil, rowIndex: number, plantIndex: number) {
    if (!this.isBlocked) {
      if (soil.isOccupied) {
        const harvestTime = soil.plant.plantedAt + soil.plant.growTime;
        const currentTime = Date.now();
        const differenceTime = harvestTime - currentTime;

        if (differenceTime < 0) {
          this.userData.balanceCoins += soil.plant.coinsIncome;
          this.balanceBar.setCoins(this.userData.balanceCoins);

          this.gardenContainer[rowIndex].remove(this.plants[rowIndex][plantIndex]);
          this.plants[rowIndex][plantIndex].destroy();

          this.plants[rowIndex][plantIndex] = new Dummy(this) as Plant;
          const dummy = this.plants[rowIndex][plantIndex] as Plant;

          soil.placePlant(dummy);

          this.gardenContainer[rowIndex].addAt(dummy, plantIndex);

          harvestPlant(this.userData.telegramId, rowIndex, plantIndex);
        }
      }

      if (!soil.isOccupied && this.pickedPlant) {
        this.plantNewSeed(soil, this.pickedPlant, rowIndex, plantIndex);
      }
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
      plant.gamePrice > this.userData.balanceCoins ||
      plant.tokenPrice > this.userData.balanceTokens
    ) {
      this.pickedPlant = null;
      this.pickedPlantBar.hide();
      return;
    }

    startGrowPlant(this.userData.telegramId, plant._id, rowIndex, plantIndex);

    this.userData.balanceCoins -= plant.gamePrice;
    this.userData.balanceTokens -= plant.tokenPrice;
    this.balanceBar.setCoins(this.userData.balanceCoins);
    this.balanceBar.setTokens(this.userData.balanceTokens);

    const plantedAt = Date.now();
    const props = {
      x: soil.x,
      y: soil.y,
      ...plant
    };

    this.plants[rowIndex][plantIndex] = new Plant(this, props, plantedAt);

    const newPlant = this.plants[rowIndex][plantIndex] as Plant;

    soil.placePlant(newPlant);

    this.gardenContainer[rowIndex].addAt(newPlant, plantIndex);

    if (
      plant.gamePrice > this.userData.balanceCoins ||
      plant.tokenPrice > this.userData.balanceTokens
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
  private renderGardenField() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - PLANTS_MARGIN;

    this.plants = this.userData.garden.field.map((gardenRow) => {
      const plantedRow = gardenRow.map((item) => {
        if (!item.plantedAt) {
          return new Dummy(this);
        }

        const props = {
          ...item.plant,
          plantedAt: item.plantedAt
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
          this.soilClickHandler(soil, rowIndex, soilIndex);
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

    this.growingInterval = setInterval(() => this.growingChecker(), 2000);
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
    if (this.userData.balanceCoins < plant.gamePrice) {
      return;
    }
    if (this.userData.balanceTokens < plant.tokenPrice) {
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
      const updatedValue = this.userData.balanceTokens + item.value;
      this.balanceBar.setTokens(updatedValue);

      createPayment({
        productId: item._id,
        userId: String(this.userData.telegramId),
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
