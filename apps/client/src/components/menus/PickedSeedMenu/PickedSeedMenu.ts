import { IPlantListItem } from '@interfaces/IPlantsMenu';

export default class PickedSeedMenu {
  public isShown: boolean;
  public plantData: IPlantListItem;

  private container: HTMLElement;

  constructor() {
    this.isShown = false;

    this.container = document.querySelector('.seed-picked');
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
    const iconHTML = document.createElement('img');
    iconHTML.classList.add('seed-picked__icon');
    iconHTML.src = data.icon;
    iconHTML.alt = data.title;

    const cardHTML = document.createElement('div');
    cardHTML.classList.add('seed-picked__card');

    const titleHTML = document.createElement('h4');
    titleHTML.classList.add('seed-picked__title');

    const infoHTML = document.createElement('div');
    infoHTML.classList.add('seed-picked__info');

    const priceMarkup = document.createElement('span');
    priceMarkup.classList.add('seed-picked__value');

    const priceIconMarkup = document.createElement('img');
    priceIconMarkup.classList.add('seed-picked__stat-icon');
    priceIconMarkup.src = './assets/coin.png';
    priceIconMarkup.alt = data.title;

    const timerMarkup = document.createElement('span');
    timerMarkup.classList.add('seed-picked__value');

    const timerIconMarkup = document.createElement('img');
    timerIconMarkup.classList.add('seed-picked__stat-icon');
    timerIconMarkup.src = './assets/timer.png';
    timerIconMarkup.alt = data.title;

    const titleText = document.createTextNode(data.title);
    const priceText = document.createTextNode(data.gamePrice + ' gold');
    const growTimeText = document.createTextNode(data.growTime + ' s');

    titleHTML.appendChild(titleText);

    timerMarkup.appendChild(timerIconMarkup);
    timerMarkup.appendChild(growTimeText);

    priceMarkup.appendChild(priceIconMarkup);
    priceMarkup.appendChild(priceText);

    infoHTML.appendChild(priceMarkup);
    infoHTML.appendChild(timerMarkup);

    cardHTML.appendChild(titleHTML);
    cardHTML.appendChild(infoHTML);

    this.container.appendChild(iconHTML);
    this.container.appendChild(cardHTML);
  }
}
