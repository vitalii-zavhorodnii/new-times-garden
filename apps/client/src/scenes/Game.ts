import { Scene } from 'phaser';

import { getSeedsList } from '@services/getSeedsList';
import { getUserGarden } from '@services/getUserGarden';

import MenuSeeds from '@components/menus/MenuSeeds';

import Dummy from '@entities/Dummy';
import Plant from '@entities/Plant';
import Seed from '@entities/Seed';
import Soil from '@entities/Soil';

import { mapFieldRows } from '@mappers/mapFieldRows';

import { CONTAINERS_DEPTH } from '@constants/containers-depth';
import { PLANTS_MARGIN, ROWS_GAP, ROW_MAP } from '@constants/rows.constants';

export class Game extends Scene {
  public camera: Phaser.Cameras.Scene2D.Camera;
  public cameraDummy: Dummy;

  private balance: number;
  private pickedSeed: Seed;

  private plantsCollection: Array<Plant>;
  private seedsCollection: Array<Seed>;
  private plants: Array<Plant | Dummy>[];
  private soil: Array<Soil[]>;

  private gardenContainer: Phaser.GameObjects.Container[];
  private soilContainer: Phaser.GameObjects.Container[];

  // private menuShop: any;
  // private menuDecoration: any;
  private menuSeeds: MenuSeeds;
  // private menuFfertilizer: any;
  // private menuSettings: any;

  private btnShop: HTMLElement;
  private btnDecorate: HTMLElement;
  private btnSeeds: HTMLElement;
  private btnFertilizer: HTMLElement;
  private btnSettings: HTMLElement;

  constructor() {
    super('Game');

    this.soilContainer = [];
    this.gardenContainer = [];
    this.plants = [];
    this.soil = [];
  }

  public preload() {
    // field tiles
    this.load.image('dummy', 'assets/dummy.png');
    this.load.image('soil', 'assets/plants/soil.png');
    this.load.image('flat', 'assets/plants/flat.png');
    this.load.image('bush', 'assets/plants/bush.png');
    // this.load.image('grass', 'assets/plants/grass.png');
    // this.load.image('plant', 'assets/plants/bush.png');
    // seeds icons
    this.load.image('blueflower', 'assets/seeds/blueflower.png');
    this.load.image('corn', 'assets/seeds/corn.png');
    this.load.image('lily', 'assets/seeds/lily.png');
    this.load.image('sunflower', 'assets/seeds/sunflower.png');
    this.load.image('tulip', 'assets/seeds/tulip.png');
  }
  // Create scene method
  public create() {
    this.camera = this.cameras.main;
    // Find all buttons
    this.btnShop = document.getElementById('shop');
    this.btnDecorate = document.getElementById('decorate');
    this.btnSeeds = document.getElementById('seeds');
    this.btnFertilizer = document.getElementById('fertilizer');
    this.btnSettings = document.getElementById('settings');
    // Add event listeners to bottom menu buttons
    this.btnShop.addEventListener('click', () => this.handleShopBtn());
    this.btnDecorate.addEventListener('click', () => this.handleDecorateBtn());
    this.btnSeeds.addEventListener('click', () => this.handleSeedsBtn());
    this.btnFertilizer.addEventListener('click', () => this.handleFertilizerBtn());
    this.btnSettings.addEventListener('click', () => this.handleSettingsBtn());
    // Run fetch data methods
    this.fetchSeedsList();
    this.fetchUserGarden();
    // Run render methods
  }

  /*
      Fetch data methods
  */
  // Get all seeds
  private async fetchSeedsList() {
    const seeds = await getSeedsList();

    this.renderSeedsList(seeds);
  }
  // Get user's garden
  private async fetchUserGarden() {
    const fieldItems = await getUserGarden();

    this.renderGardenField(fieldItems);
  }
  // Handle picking seed to plant
  private handleSeedPick(seed: any) {
    console.log({ seed });
    this.add.container(0, 0);
  }
  // Handle to start growing new Plant
  private handleNewPlant(
    rowIndex: number,
    plantIndex: number,
    plant: Plant,
    x: number,
    y: number
  ) {
    if (this.pickedSeed) {
      this.plants[rowIndex][plantIndex] = Object.create(this.pickedSeed.plant);

      const newPlant = this.plants[rowIndex][plantIndex];

      // newPlant.x = x;
      // newPlant.y = y;
      // newPlant.activate();
      newPlant.on('pointerdown', () => {
        // this.handleNewPlant(rowIndex, plantIndex, newPlant, x, y);
      });

      this.gardenContainer[rowIndex].addAt(newPlant, plantIndex);

      // this.pickedSeed = null;
      plant.destroy();
    }
  }
  /*
      Render methods
      Render garden field
  */
  // Render seeds list
  private renderSeedsList(seeds) {
    this.menuSeeds = new MenuSeeds(seeds, (index: number) =>
      this.handleSeedPick(index)
    );
  }
  // Render garden field
  private renderGardenField(fieldItems: any[]) {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - PLANTS_MARGIN;

    this.plants = fieldItems.map((row: any[], rowIndex: number) => {
      const plantedRow = row.map(({ x, y, texture }, plantIndex: number) => {
        if (!texture) {
          return new Dummy(this);
        }

        const plant = new Plant(this, x, y, texture);

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
  private renderSoil(plants: Array<Plant | Dummy>[]) {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    this.soil = mapFieldRows(ROW_MAP).map((row: any[], rowIndex: number) => {
      const soilRow = row.map(({ x, y }, soilIndex: number) => {
        const soil = new Soil(this, x, y);
        soil.setInteractive();

        const plant = plants[rowIndex][soilIndex];
        if (!plant['dummy']) {
          soil.placePlant(plant as Plant);
        }

        soil.on('pointerdown', () => {
          if (soil.isOccupied) {
            console.log('Plant clicked!');
            console.log({ isOccupied: soil.isOccupied });
            console.log({ plant: soil.plant });
          }

          if (!soil.isOccupied) {
            console.log('Soil clicked!');
            console.log({ isOccupied: soil.isOccupied });
            console.log({ plant: soil.plant });
          }
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
  /*
      Bottom menu handlers
      Handle button click: Shop
  */
  private handleShopBtn() {
    console.log('handleShopBtn');
  }
  // Handle button click: Decorattions
  private handleDecorateBtn() {
    console.log('handleDecorateBtn');
  }
  // Handle button click: Seeds
  private handleSeedsBtn() {
    this.menuSeeds.toggle();
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
