import { Scene } from 'phaser';
import { IPlantData } from 'src/interfaces/IUserData';

export type { IPlantData } from '@interfaces/IUserData';
export default class Plant extends Phaser.GameObjects.Sprite {
  public icon: string;
  public description: string;

  public growTime: number;
  public plantedAt: number;

  public dummy: boolean;

  constructor(scene: Scene, props: IPlantData, plantedAt: number) {
    super(scene, props.x, props.y, props.texture, props.title);

    this.growTime = props.growTime;
    this.plantedAt = plantedAt;
  }

  public preDestroy() {
    this.anims.destroy();
    this.anims = undefined;
  }
}
