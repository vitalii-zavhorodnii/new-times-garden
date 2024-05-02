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
    this.createMarkup(plantData);
    this.container.classList.remove('hidden');
  }

  public hide() {
    this.container.classList.add('hidden');
  }

  private createMarkup(data: IPlantListItem) {
    const convertedTimer = String(data.growTime);
    console.log({ data });
    const markupHTML = markup(data.gamePrice, data.tokenPrice, convertedTimer,data.icon);

    this.container.innerHTML = markupHTML;
  }
}
