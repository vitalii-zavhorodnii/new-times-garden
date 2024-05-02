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

      const iconHTML = document.createElement('img');
      iconHTML.classList.add('plants-menu__icon');
      iconHTML.src = plant.icon;
      iconHTML.alt = plant.title;

      const cardHTML = document.createElement('div');
      cardHTML.classList.add('plants-menu__card');

      const titleHTML = document.createElement('h4');
      titleHTML.classList.add('plants-menu__title');

      const infoHTML = document.createElement('div');
      infoHTML.classList.add('plants-menu__info');

      const priceMarkup = document.createElement('span');
      priceMarkup.classList.add('plants-menu__value');

      const priceIconMarkup = document.createElement('img');
      priceIconMarkup.classList.add('plants-menu__stat-icon');
      priceIconMarkup.src = './assets/utils/coin.png';
      priceIconMarkup.alt = plant.title;

      const timerMarkup = document.createElement('span');
      timerMarkup.classList.add('plants-menu__value');

      const timerIconMarkup = document.createElement('img');
      timerIconMarkup.classList.add('plants-menu__stat-icon');
      timerIconMarkup.src = './assets/utils/timer.png';
      timerIconMarkup.alt = plant.title;

      const titleText = document.createTextNode(plant.title);
      const priceText = document.createTextNode(plant.gamePrice + ' gold');
      const growTimeText = document.createTextNode(plant.growTime + ' s');

      titleHTML.appendChild(titleText);

      timerMarkup.appendChild(timerIconMarkup);
      timerMarkup.appendChild(growTimeText);

      priceMarkup.appendChild(priceIconMarkup);
      priceMarkup.appendChild(priceText);

      infoHTML.appendChild(priceMarkup);
      infoHTML.appendChild(timerMarkup);

      cardHTML.appendChild(titleHTML);
      cardHTML.appendChild(infoHTML);

      itemHTML.appendChild(iconHTML);
      itemHTML.appendChild(cardHTML);

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
