import { markup } from './markup';
import { Duration } from 'luxon';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

export default class PlantsMenu {
  public isOpen: boolean;
  public list: IPlantListItem[];
  public callback: Function;

  private container: HTMLElement;
  private content: HTMLElement;

  constructor(plants: IPlantListItem[], callback: Function) {
    this.isOpen = false;
    this.callback = callback;

    this.container = document.getElementById('plants-menu');
    this.content = document.getElementById('plants-menu-content');

    this.createMarkup(plants);
  }

  public open() {
    this.isOpen = true;
    this.container.classList.remove('hidden');
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  public toggle() {
    if (!this.isOpen) {
      this.open();
    } else if (this.isOpen) {
      this.close();
    }
  }

  private createMarkup(plants: IPlantListItem[]) {
    const list = plants.map((plant, index) => {
      const itemHTML = document.createElement('li');
      itemHTML.classList.add('plants-menu__item');
      itemHTML.setAttribute('index', String(index));

      const growing = Duration.fromMillis(plant.growTime).toFormat('hh:mm');

      console.log({ growing });

      const markupHTML: string = markup(
        plant.title,
        plant.gamePrice,
        plant.tokenPrice,
        plant.coinsIncome,
        plant.tokensIncome,
        String(growing)
      );

      itemHTML.innerHTML = markupHTML;

      itemHTML.addEventListener('click', () => {
        this.callback(plant);
      });

      return itemHTML;
    });

    const listHTML = document.createElement('ul');

    list.forEach((item) => {
      listHTML.appendChild(item);
    });

    this.content.appendChild(listHTML);
  }
}
