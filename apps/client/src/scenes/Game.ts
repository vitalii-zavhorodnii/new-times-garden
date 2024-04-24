import { Scene } from 'phaser';

import { getUserGarden } from '@services/getUserGarden';
import { getSeedsList } from 'src/services/getSeedsList';

import SideMenu from '@components/SideMenu';
import BottomMenu from '@components/BottomMenu';
import SeedsMenu from '@components/SeedsMenu';

import Plant from '@entities/Plant';
import Seed from '@entities/Seed';

export class Game extends Scene {
  public camera: Phaser.Cameras.Scene2D.Camera;

  private gamefieldContainer: Array<Phaser.GameObjects.Container>;

  private seeds: Array<Seed>;
  private plants: Array<Plant[]>;
  private clickedSeed: Seed;

  private sideMenu: SideMenu;
  private bottomMenu: BottomMenu;
  private seedsMenu: SeedsMenu;

  // private bottomMenuBtns: Array<HTMLElement>;
  private btnDecorate: HTMLElement;
  private btnFertilizer: HTMLElement;
  private btnSeeds: HTMLElement;
  private btnShop: HTMLElement;
  private btnSettings: HTMLElement;

  constructor() {
    super('Game');

    this.gamefieldContainer = [];
    this.plants = [];
  }

  public preload() {
    // field tiles
    this.load.image('soil', 'assets/tileset/soil.png');
    this.load.image('grass', 'assets/tileset/grass.png');
    this.load.image('plant', 'assets/tileset/plant.png');
    // seeds icons
    this.load.image('blueflower', 'assets/seeds/blueflower.png');
    this.load.image('corn', 'assets/seeds/corn.png');
    this.load.image('lily', 'assets/seeds/lily.png');
    this.load.image('sunflower', 'assets/seeds/sunflower.png');
    this.load.image('tulip', 'assets/seeds/tulip.png');
  }

  public create() {
    this.sideMenu = new SideMenu();
    this.bottomMenu = new BottomMenu();
    this.camera = this.cameras.main;

    this.btnShop = document.getElementById('shop');
    this.btnDecorate = document.getElementById('decorate');
    this.btnSeeds = document.getElementById('seeds');
    this.btnFertilizer = document.getElementById('fertilizer');
    this.btnSettings = document.getElementById('settings');

    this.btnShop.addEventListener('click', () => this.handleShopBtn());
    this.btnDecorate.addEventListener('click', () => this.handleDecorateBtn());
    this.btnSeeds.addEventListener('click', () => this.handleSeedsBtn());
    this.btnFertilizer.addEventListener('click', () => this.handleFertilizerBtn());
    this.btnSettings.addEventListener('click', () => this.handleSettingsBtn());

    this.fetchUserData();
    this.renderSeedsMenu();
  }

  private handleDecorateBtn() {
    console.log("handleDecorateBtn");
  }

  private handleFertilizerBtn() {
    console.log("handleFertilizerBtn");
  }

  private handleSeedsBtn() {
    this.seedsMenu.toggle();
  }

  private handleShopBtn() {
    console.log("handleShopBtn");
  }

  private handleSettingsBtn() {
    console.log("handleSettingsBtn");
  }

  private handleSeedClick(data: any) {
    console.log({ data, seedsMenu: this.seedsMenu })
    this.seedsMenu.close();
  }



  private async renderSeedsMenu() {
    const seeds = await getSeedsList();

    this.seedsMenu = new SeedsMenu(seeds, (index: number) => this.handleSeedClick(index))
    console.log({ menu: this.seedsMenu })
  }

  private handleNewPlant(
    rowIndex: number,
    plantIndex: number,
    plant: Plant,
    x: number,
    y: number
  ) {
    if (this.clickedSeed) {
      this.plants[rowIndex][plantIndex] = Object.create(this.clickedSeed.plant);

      const newPlant = this.plants[rowIndex][plantIndex];

      newPlant.x = x;
      newPlant.y = y;
      newPlant.activate();
      newPlant.on('pointerdown', () => {
        this.handleNewPlant(rowIndex, plantIndex, newPlant, x, y);
      });

      this.gamefieldContainer[rowIndex].addAt(newPlant, plantIndex);

      // this.clickedSeed = null;
      plant.destroy();
    }
  }

  private renderGardenField() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    // added rows to container
    this.plants.forEach((row, index) => {
      const container = this.add.container(
        centerX + (index - 3) * -18,
        centerY + (index - 3) * 10
      );

      this.gamefieldContainer.push(container);
      this.gamefieldContainer[index].add(row);
    });
  }

  private async fetchUserData() {
    // get mapped user field
    const field = await getUserGarden();

    this.plants = field.map((row: any[], rowIndex: number) => {
      const plantedRow = row.map(({ x, y, texture }, plantIndex: number) => {
        const plant = new Plant(this, x, y, texture);

        plant.activate();
        plant.on('pointerdown', () => {
          this.handleNewPlant(rowIndex, plantIndex, plant, x, y);
        });

        return plant;
      });

      return plantedRow;
    });

    this.renderGardenField();
  }
}
