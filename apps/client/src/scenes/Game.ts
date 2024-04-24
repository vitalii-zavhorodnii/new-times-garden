import { Scene } from 'phaser';

import { getUserGarden } from '@services/getUserGarden';

import SideMenu from '@components/SideMenu';
import BottomMenu from '@components/BottomMenu';

import Plant from '@entities/Plant';
import Seed from '@entities/Seed';

import { SEEDS } from '@constants/seeds';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  gamefieldContainer: Array<Phaser.GameObjects.Container>;
  plants: Array<Plant[]>;
  sideMenu: SideMenu;
  bottomMenu: BottomMenu;
  bottomMenuContainer: Phaser.GameObjects.Container;
  clickedSeed: Seed;

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
    // this.sideMenu.open();
    // create camera
    this.camera = this.cameras.main;
    // this.cameras.main.setZoom(1);
    // this.camera.setBackgroundColor("#87CEEB");

    // fetch user field
    this.fetchUserData();
    this.renderBottomMenu();
  }

  private async fetchUserData() {
    // get mapped user field
    const field = await getUserGarden();

    this.plants = field.map((row, rowIndex: number) => {
      const plantedRow = row.map(({ x, y, texture }, plantIndex: number) => {
        const plant = new Plant(this, x, y, texture);

        plant.activate();
        plant.on('pointerdown', () => {
          this.plantHandler(rowIndex, plantIndex, plant, x, y);
        });

        return plant;
      });

      return plantedRow;
    });

    this.generateGardenField();
  }

  private plantHandler(
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
        this.plantHandler(rowIndex, plantIndex, newPlant, x, y);
      });

      this.gamefieldContainer[rowIndex].addAt(newPlant, plantIndex);

      // this.clickedSeed = null;
      plant.destroy();
    }
  }

  private generateGardenField() {
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

  private renderBottomMenu() {
    const { height } = this.cameras.main;

    const graphics = this.add.graphics({ fillStyle: { color: 0x8899a5 } });
    const rect = new Phaser.Geom.Rectangle(0, 0, 200, 50);
    graphics.fillRectShape(rect);

    const bottomMenu = SEEDS.map((item, index) => {
      const seed = new Seed(
        this,
        22 + index * 32,
        25,
        item.texture,
        item.title,
        new Plant(this, 22 + index * 32, 25, item.plant)
      );

      seed.activate();
      seed.on('pointerdown', () => {
        this.clickedSeed = Object.create(seed);
        console.log('Seed clicked: ' + seed.title);
      });

      return seed;
    });

    this.bottomMenuContainer = this.add.container(10, height - 160);
    this.bottomMenuContainer.add(graphics);
    this.bottomMenuContainer.add(bottomMenu);
  }
}
