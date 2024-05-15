import EventBus from '@emitter/EventBus';
import { GameObjects, Scene } from 'phaser';

export class HouseScene extends Scene {
  private background: Phaser.GameObjects.Image;

  private fireSprite: Phaser.GameObjects.Sprite;
  private chairsSprite: Phaser.GameObjects.Sprite;
  private bookSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super('HouseScene');
  }

  preload() {
    // House assets
    this.load.image('h-background', 'assets/house/background.png');
    this.load.image('h-chairs', 'assets/house/chairs.png');
    this.load.spritesheet('h-book', 'assets/house/book.png', {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet('fireplace', 'assets/house/fire.png', {
      frameWidth: 256,
      frameHeight: 256
    });
  }

  create() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    this.background = this.add.image(centerX, centerY, 'h-background');
    this.background.setScale(0.35, 0.35);

    this.fireSprite = this.add.sprite(centerX + 10, centerY + 125, 'fireplace');
    this.fireSprite.setScale(0.35, 0.35);

    this.anims.create({
      key: 'fire',
      frameRate: 9,
      frames: this.anims.generateFrameNumbers('fireplace'),
      repeat: -1
    });

    this.anims.create({
      key: 'book-idle',
      frameRate: 24,
      frames: this.anims.generateFrameNumbers('h-book'),
      repeat: -1
    });

    const button = this.add.text(centerX - 100, centerY + 250, 'Back');
    button.setInteractive();
    button.on('pointerdown', () => {
      console.log('emit', 'swith-to-game');
      EventBus.emit('swith-to-game');
      this.scene.switch('Game');
    });

    this.fireSprite.play('fire');

    this.chairsSprite = this.add.sprite(centerX + 10, centerY + 125, 'h-chairs');
    this.bookSprite = this.add.sprite(centerX + 10, centerY + 125, 'h-book');

    this.chairsSprite.setInteractive(this.input.makePixelPerfect());
    this.bookSprite.setInteractive(this.input.makePixelPerfect());
    this.bookSprite.play('book-idle');

    this.chairsSprite.on('pointerdown', () => {
      this.handleChairsClick();
    });

    this.bookSprite.on('pointerdown', () => {
      this.handleBookClick();
    });
  }

  private handleChairsClick() {
    console.log('Chairs clicked!');
  }

  private handleBookClick() {
    console.log('Book clicked!');
  }
}
