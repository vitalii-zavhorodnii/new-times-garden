import { Scene } from 'phaser';

import { sendTonTransaction } from '@services/sendTonTransaction';

import BalanceMenu from '@components/menus/BalanceMenu';
import BottomMenu from '@components/menus/BottomMenu';
import PickedSeedMenu from '@components/menus/PickedSeedMenu';
import PlantsMenu from '@components/menus/PlantsMenu';
import ShopMenu from '@components/menus/ShopMenu';

import Dummy from '@entities/Dummy';
import Plant from '@entities/Plant';
import Soil from '@entities/Soil';

import { mapFieldRows } from '@mappers/mapFieldRows';

import { randomNumberHelper } from '@helpers/random-number';

import { CAMERA_BOUNDRIES } from '@constants/camera-boundries.constants';
import { CONTAINERS_DEPTH } from '@constants/containers-depth';
import { TON_TO_USD } from '@constants/currency.constants';
import { PLANTS_MARGIN, ROWS_GAP, ROW_MAP } from '@constants/rows.constants';

import type { IPlantListItem } from '@interfaces/IPlantListItem';
import type { IShopItem } from '@interfaces/IShopItem';

export class Game extends Scene {
  public camera: Phaser.Cameras.Scene2D.Camera;
  public isBlocked: boolean;

  // private balance: number;
  private pickedPlant: IPlantListItem;

  // private plantsCollection: Array<Plant>;
  // private plantsCollection: Array<Seed>;
  private userData: any;
  private plantsData: IPlantListItem[];
  private shopList: IShopItem[];

  private plants: Array<Plant | Dummy>[];
  private soil: Array<Soil[]>;

  private gardenContainer: Phaser.GameObjects.Container[];
  private soilContainer: Phaser.GameObjects.Container[];

  private pickedSeedInfo: PickedSeedMenu;
  private bottomMenu: BottomMenu;
  private balanceMenu: BalanceMenu;
  private shopMenu: ShopMenu;
  // private menuDecoration: any;
  private menuPlants: PlantsMenu;
  // private menuFfertilizer: any;
  // private menuSettings: any;

  private btnAddCurrency: HTMLElement;
  private btnShop: HTMLElement;
  private btnDecorate: HTMLElement;
  private btnPlants: HTMLElement;
  private btnFertilizer: HTMLElement;
  private btnSettings: HTMLElement;

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
    // Find all buttons
    this.btnShop = document.getElementById('shop');
    this.btnDecorate = document.getElementById('decorate');
    this.btnPlants = document.getElementById('plants');
    this.btnFertilizer = document.getElementById('fertilizer');
    this.btnSettings = document.getElementById('settings');
    this.btnAddCurrency = document.getElementById('shop-button');
    // Menus
    this.balanceMenu = new BalanceMenu();
    this.balanceMenu.setCoins(this.userData.balanceCoins);
    this.balanceMenu.setTokens(this.userData.balanceTokens);
    this.balanceMenu.show();
    this.bottomMenu = new BottomMenu();
    this.bottomMenu.show();
    this.shopMenu = new ShopMenu(this.shopList, (item: IShopItem) =>
      this.handleShopItemClick(item)
    );
    /*
      Opacity for ont completed buttons
    */
    this.btnShop.style.opacity = '0.5';
    this.btnDecorate.style.opacity = '0.5';
    this.btnFertilizer.style.opacity = '0.5';
    this.btnSettings.style.opacity = '0.5';
    // Add event listeners to bottom menu buttons
    this.btnShop.addEventListener('click', () => this.handleShopBtn());
    this.btnDecorate.addEventListener('click', () => this.handleDecorateBtn());
    this.btnPlants.addEventListener('click', () => this.handlePlantsBtn());
    this.btnFertilizer.addEventListener('click', () => this.handleFertilizerBtn());
    this.btnSettings.addEventListener('click', () => this.handleSettingsBtn());
    // Background
    const backgroundImage = this.add.image(centerX, centerY, 'background');
    backgroundImage.x = backgroundImage.x - 250;
    // backgroundImage.setDisplaySize(backgroundImage.width, height);
    // Run fetch data methods
    this.renderPlantsList();
    this.renderGardenField();
    // Create picked seed data
    this.pickedSeedInfo = new PickedSeedMenu();
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

    this.btnAddCurrency.addEventListener('click', () => {
      this.handleAddButton();
    });
  }
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
      this.pickedSeedInfo.show(this.pickedPlant);
      this.isBlocked = false;
    });
  }
  /*
      Bottom menu handlers
      Handle button click: Shop
  */
  private handleAddButton() {
    this.shopMenu.open();
  }
  private handleShopBtn() {
    // this.camera.scrollY += 100;
    console.log('handleShopBtn');
    // const url =
    //   'https://t.me/wallet?attach=wallet&startattach=tonconnect-ret__https--3A--2F--2Ft--2Eme--2FNewTimesGardenBot';
    // window.open(url);
  }
  // Handle shops items
  private async handleShopItemClick(item: IShopItem) {
    const amount = item.price / TON_TO_USD;
    const result = await sendTonTransaction(amount);
    console.log({ result });
    // sendTonTransaction();
  }
  // Handle button click: Decorattions
  private handleDecorateBtn() {
    console.log('handleDecorateBtn');
  }
  // Handle button click: Plants
  private handlePlantsBtn() {
    if (this.menuPlants.isOpen || this.pickedPlant) {
      this.pickedPlant = null;
      this.isBlocked = false;
      this.menuPlants.close();
      this.pickedSeedInfo.hide();

      return;
    }

    this.pickedPlant = null;
    this.isBlocked = true;
    this.menuPlants.open();
    this.pickedSeedInfo.hide();
  }
  // Handle button click: Fertilizer
  private handleFertilizerBtn() {
    console.log('handleFertilizerBtn');
  }
  // Handle button click: Settings
  private handleSettingsBtn() {
    console.log('handleSettingsBtn');
  }
}
