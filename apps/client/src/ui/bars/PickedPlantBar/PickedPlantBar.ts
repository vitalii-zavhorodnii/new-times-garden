import { markup } from './markup';

import { IPlantListItem } from '@interfaces/IPlantListItem';

export default class PickedPlantBar {
  public isShown: boolean;
  public plantData: IPlantListItem;

  private container: HTMLElement;

  constructor() {
    this.isShown = false;

    this.container = document.querySelector('.picked-plant-bar');
    this.container.style.display = 'none';
  }

  public show(plantData: IPlantListItem) {
    this.createMarkup(plantData);
    this.container.style.display = 'flex';
  }

  public hide() {
    this.container.innerHTML = '';
    this.container.style.display = 'none';
  }

  private createMarkup(data: IPlantListItem): void {
    const convertedTimer = String(data.growTime);

    const markupHTML = markup(data.coinPrice, data.tokenPrice, convertedTimer);

    this.container.innerHTML = markupHTML;
  }
}
