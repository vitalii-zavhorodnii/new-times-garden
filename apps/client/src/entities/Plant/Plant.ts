import { Scene } from 'phaser';

import { PLANTS_ANIMATED } from '@constants/plants-sprites';

import type { IPlantData } from '@interfaces/IUserData';

export default class Plant extends Phaser.GameObjects.Sprite {
  public title: string;
  public icon: string;
  public description: string;
  public phase: number;
  public isAnimated: boolean;

  public growTime: number;
  public plantedAt: number;
  public gamePrice: number;
  public tokenPrice: number;
  public coinsIncome: number;
  public tokensIncome: number;
  public xpIncome: number;

  public dummy: boolean;

  constructor(scene: Scene, props: IPlantData, plantedAt: number) {
    super(scene, props.x, props.y, props.texture, props.title);

    this.phase = 0;
    this.dummy = false;
    this.title = props.title;
    this.gamePrice = props.gamePrice;
    this.tokenPrice = props.tokenPrice;
    this.coinsIncome = props.coinsIncome;
    this.tokensIncome = props.tokensIncome;
    this.xpIncome = props.xpIncome;
    this.growTime = props.growTime;
    this.plantedAt = plantedAt;
    this.isAnimated = PLANTS_ANIMATED.includes(props.texture);
  }

  public preDestroy() {
    this.anims.destroy();
    this.anims = undefined;
  }
}
