import { markup } from './markup';

import { timeReadableConverter } from '@helpers/time-coverter';

import { IPlantListItem } from '@interfaces/IPlantListItem';

export default class PickedPlantBar {
  public isShown: boolean;
  public plantData: IPlantListItem;

  private container: HTMLElement;

  constructor() {
    this.isShown = false;

    this.container = document.getElementById('picked-plant-container');
  }

  public show(plantData: IPlantListItem) {
    const growingString = timeReadableConverter(plantData.growTime);

    const markupHTML = markup(
      plantData.gamePrice,
      plantData.tokenPrice,
      growingString,
      plantData.icon
    );

    this.container.innerHTML = markupHTML;
    this.container.classList.remove('hidden');
  }

  public hide() {
    this.container.classList.add('hidden');
  }
}
