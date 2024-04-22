import { Scene } from 'phaser';

import Plant from '@components/Plant';
import Seed from '@components/Seed';

import { PLANT_COORDS } from '@constants/plant-coords';
import { SEEDS } from '@constants/seeds';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  gamefieldContainer: Phaser.GameObjects.Container[];
  bottomMenuContainer: Phaser.GameObjects.Container;
  clickedSeed: Seed;

  constructor() {
    super('Game');
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
    // create camera
    this.camera = this.cameras.main;
    // this.cameras.main.setZoom(1);
    // this.camera.setBackgroundColor("#87CEEB");

    this.generateGardenField();
    this.renderBottomMenu();
  }

  private generateGardenField() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    const gardenField = PLANT_COORDS.map((row, rowIndex) => {
      const plantedRow = row.map(({ x, y, texture }, plantIndex) => {
        const plant = new Plant(this, x, y, texture);

        plant.activate();
        plant.on('pointerdown', () => {
          if (this.clickedSeed) {
            this.gamefieldContainer[rowIndex][plantIndex] = this.clickedSeed.plant;

            this.clickedSeed = null;
            plant.destroy();
          }
        });

        return plant;
      });

      return plantedRow;
    });

    // added rows to container
    gardenField.forEach((row, index) => {
      const container = this.add.container(
        centerX + (index - 3) * -18,
        centerY + (index - 3) * 10
      );
      this.gamefieldContainer.push(container);

      this.gamefieldContainer.add(row);
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
        this.clickedSeed = seed;
        console.log('Seed clicked: ' + seed.title);
      });

      return seed;
    });

    this.bottomMenuContainer = this.add.container(10, height - 60);
    this.bottomMenuContainer.add(graphics);
    this.bottomMenuContainer.add(bottomMenu);
  }
}
