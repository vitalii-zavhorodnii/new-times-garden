import { markup } from './markup';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

export default class PlantsMenu {
  public isOpen: boolean;
  public list: IPlantListItem[];
  public callback: Function;

  private container: HTMLElement;
  private listContainer: HTMLElement;

  constructor(plants: IPlantListItem[], callback: Function) {
    this.isOpen = false;
    this.callback = callback;

    this.container = document.querySelector('.plants-menu');
    this.listContainer = document.querySelector('.plants-menu__list');

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

      const markupHTML: string = markup(
        plant.title,
        plant.gamePrice,
        plant.tokenPrice,
        plant.coinsIncome,
        plant.tokensIncome,
        String(plant.growTime),
        plant.icon
      );

      itemHTML.innerHTML = markupHTML;

      itemHTML.addEventListener('click', () => {
        this.callback(plant);
        this.close();
      });

      return itemHTML;
    });

    list.forEach((item) => {
      this.listContainer.appendChild(item);
    });
  }
}
