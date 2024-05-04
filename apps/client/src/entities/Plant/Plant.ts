import { Scene } from 'phaser';

import type { IPlantData } from '@interfaces/IUserData';

export default class Plant extends Phaser.GameObjects.Sprite {
  public title: string;
  public icon: string;
  public description: string;

  public growTime: number;
  public plantedAt: number;
  public gamePrice: number;
  public tokenPrice: number;
  public coinsIncome: number;
  public tokensIncome: number;

  public dummy: boolean;

  constructor(scene: Scene, props: IPlantData, plantedAt: number) {
    super(scene, props.x, props.y, props.texture, props.title);

    this.title = props.title;
    this.gamePrice = props.gamePrice;
    this.tokenPrice = props.tokenPrice;
    this.coinsIncome = props.coinsIncome;
    this.tokensIncome = props.tokensIncome;
    this.growTime = props.growTime;
    this.plantedAt = plantedAt;
  }

  public preDestroy() {
    this.anims.destroy();
    this.anims = undefined;
  }
}
