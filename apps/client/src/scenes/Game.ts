import { Scene } from 'phaser';

import { createPayment } from '@services/createPayment';
import { sendTonTransaction } from '@services/sendTonTransaction';

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

  private plants: Array<Plant | Dummy>[];
  private soil: Array<Soil[]>;

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

  public init(data: any) {
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
      Camera movement
    */
    this.input.on('pointermove', (p) => {
      if (!p.isDown) return;

      const { scrollX } = this.camera;
      const { left, right } = CAMERA_BOUNDRIES;

      const distance = p.x - p.prevPosition.x + 3 / this.camera.zoom;
      // sensitivity refactor
      // console.log({ distance: p.x - p.prevPosition.x });

      this.camera.scrollX -= distance;

      if (scrollX <= left) {
        this.camera.scrollX = left + 5;
      }

      if (scrollX >= right) {
        this.camera.scrollX = right - 5;
      }

      // this.camera.scrollY -= (p.y - p.prevPosition.y) / this.camera.zoom;
    });
  }
  /*
    Methods
  */
  // Handle clicks on soil
  private soilClickHandler(soil: Soil, rowIndex: number, plantIndex: number) {
    if (!this.isBlocked) {
      if (soil.isOccupied) {
        console.log('Growing...');
      }

      if (!soil.isOccupied && this.pickedPlant) {
        this.plantNewSeed(soil, this.pickedPlant, rowIndex, plantIndex);
      }
    }
  }
  // Handle planing process
  private plantNewSeed(
    soil: Soil,
    plant: IPlantListItem,
    rowIndex: number,
    plantIndex: number
  ) {
    const { texture, title, growTime } = plant;
    const { x, y } = soil;
    const plantedAt = Date.now();

    this.plants[rowIndex][plantIndex] = new Plant(
      this,
      x,
      y,
      texture,
      title,
      plantedAt,
      growTime
    );

    const newPlant = this.plants[rowIndex][plantIndex] as Plant;

    soil.placePlant(newPlant);

    this.gardenContainer[rowIndex].addAt(newPlant, plantIndex);
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
        if (!item.texture) {
          return new Dummy(this);
        }

        const { x, y, texture, title, plantedAt, growTime } = item;

        const plant = new Plant(this, x, y, texture, title, plantedAt, growTime);

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

        const soil = new Soil(this, x, y, 'soil');
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
  }
  // Render plants list
  private renderPlantsList() {
    this.menuPlants = new PlantsMenu(this.plantsData, (plant: IPlantListItem) => {
      this.pickedPlant = plant;
      this.pickedPlantBar.show(this.pickedPlant);
      this.isBlocked = false;
    });
  }
  /*
      Bottom menu handlers
      Handle button click: Shop
  */
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
