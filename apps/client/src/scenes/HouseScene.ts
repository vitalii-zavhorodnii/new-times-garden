import { GameObjects, Scene } from 'phaser';

export class HouseScene extends Scene {
  private fireplace: Phaser.GameObjects.Sprite;
  private background: Phaser.GameObjects.Image;

  constructor() {
    super('HouseScene');
  }

  preload() {
    
  }

  create() {
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    this.background = this.add.image(centerX, centerY, 'interior-bg');
    this.background.setScale(0.35, 0.35);

    this.fireplace = this.add.sprite(centerX + 10, centerY + 125, 'fireplace');
    this.fireplace.setScale(0.35, 0.35);

    this.anims.create({
      key: 'fire',
      frameRate: 9,
      frames: this.anims.generateFrameNumbers('fireplace'),
      repeat: -1
    });

    const button = this.add.text(centerX - 100, centerY + 200, 'Back');
    button.setInteractive();
    button.on('pointerdown', () => {
      this.scene.switch('Game');
    });

    this.fireplace.play('fire');
  }
}
