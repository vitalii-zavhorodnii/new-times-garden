import { markup } from './markup';

import { IPlantListItem } from '@interfaces/IPlantListItem';

export default class PickedPlantBar {
  public isShown: boolean;
  public plantData: IPlantListItem;

  private container: HTMLElement;

  constructor() {
    this.isShown = false;

    this.container = document.querySelector('.picked-plant-bar');
  }

  public show(plantData: IPlantListItem) {
    const convertedTimer = String(plantData.growTime);

    const markupHTML = markup(
      plantData.gamePrice,
      plantData.tokenPrice,
      convertedTimer,
      plantData.icon
    );

    this.container.innerHTML = markupHTML;
    this.container.classList.remove('hidden');
  }

  public hide() {
    this.container.classList.add('hidden');
  }
}
