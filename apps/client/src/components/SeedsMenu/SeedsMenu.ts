import type { ISeedsList } from '@interfaces/ISeedsMenu';

export default class SeedsMenu {
  public isOpen: boolean;
  public list: ISeedsList;
  public callback: Function;

  private container: HTMLElement;
  private listContainer: HTMLElement;

  constructor(seeds: any[], callback: Function) {
    this.isOpen = false;
    this.callback = callback;

    this.container = document.querySelector('.seeds-menu');
    this.listContainer = document.querySelector('.seeds-menu__list');

    this.createMarkup(seeds);
  }

  public open() {
    this.isOpen = true;
    this.container.style.left = '0';
  }

  public close() {
    this.isOpen = false;
    this.container.style.left = '-100vw';
  }

  private createMarkup(seeds: any[]) {
    const list = seeds.map((seed, index) => {
      const itemHTML = document.createElement("li");
      itemHTML.classList.add('seeds-menu__item')
      itemHTML.setAttribute('index', String(index))

      const iconHTML = document.createElement('img')
      iconHTML.classList.add("seeds-menu__icon")
      iconHTML.src = seed.icon
      iconHTML.alt = seed.title;

      const cardHTML = document.createElement('div');
      cardHTML.classList.add('seeds-menu__card')

      const titleHTML = document.createElement('h4')
      titleHTML.classList.add('seeds-menu__title')

      const infoHTML = document.createElement('div')
      infoHTML.classList.add('seeds-menu__info')

      const priceMarkup = document.createElement('span')
      priceMarkup.classList.add('seeds-menu__value')

      const priceIconMarkup = document.createElement('img')
      priceIconMarkup.classList.add('seeds-menu__stat-icon')
      priceIconMarkup.src = './assets/coin.png';
      priceIconMarkup.alt = seed.title;

      const timerMarkup = document.createElement('span')
      timerMarkup.classList.add('seeds-menu__value')

      const timerIconMarkup = document.createElement('img')
      timerIconMarkup.classList.add('seeds-menu__stat-icon')
      timerIconMarkup.src = './assets/timer.png';
      timerIconMarkup.alt = seed.title;

      const titleText = document.createTextNode(seed.title);
      const priceText = document.createTextNode(seed.cost + ' gold');
      const growTimeText = document.createTextNode(seed.growTime + ' s');

      titleHTML.appendChild(titleText);

      timerMarkup.appendChild(timerIconMarkup)
      timerMarkup.appendChild(growTimeText)

      priceMarkup.appendChild(priceIconMarkup)
      priceMarkup.appendChild(priceText);

      infoHTML.appendChild(priceMarkup);
      infoHTML.appendChild(timerMarkup);

      cardHTML.appendChild(titleHTML);
      cardHTML.appendChild(infoHTML);

      itemHTML.appendChild(iconHTML)
      itemHTML.appendChild(cardHTML)

      return itemHTML;
    })

    list.forEach((item, index) => {
      this.listContainer.appendChild(item)
      item.addEventListener('click', () => {
        this.callback(index)
      })
    })
  }
}
