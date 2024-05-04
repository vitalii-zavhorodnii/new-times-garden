import type { IShopItem } from '@interfaces/IShopItem';

export default class ShopMenu {
  public isOpen: boolean;
  public shopList: IShopItem[];

  private container: HTMLElement;
  private content: HTMLElement;
  private callbackItemClick: Function;

  constructor(list: IShopItem[], callback: Function) {
    this.isOpen = false;

    this.container = document.getElementById('shop-menu');
    this.content = document.getElementById('shop-menu-content');

    this.shopList = list;
    this.callbackItemClick = callback;

    this.createMarkup();
  }

  public open() {
    this.isOpen = true;
    this.container.classList.remove('hidden');
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  private createMarkup() {
    this.shopList.forEach((menuItem) => {
      const itemHTML = document.createElement('li');
      itemHTML.classList.add('shop-menu__item');

      const imgHTML = document.createElement('img');
      imgHTML.classList.add('shop-menu__image');
      imgHTML.setAttribute('src', menuItem.img);
      imgHTML.setAttribute('alt', 'menu-item');

      const valueHTML = document.createElement('span');
      valueHTML.classList.add('shop-menu__value');
      const valueTextNode = document.createTextNode(String(menuItem.value));

      const iconHTML = document.createElement('img');
      iconHTML.classList.add('shop-menu__icon');
      iconHTML.setAttribute('src', './assets/utils/token.svg');
      iconHTML.setAttribute('alt', 'icon');

      const textHTML = document.createElement('p');
      textHTML.classList.add('shop-menu__text');

      const costHTML = document.createElement('span');
      costHTML.classList.add('shop-menu__cost');
      costHTML.innerHTML = `$${String(menuItem.price)}`;

      const saleHTML = document.createElement('span');
      saleHTML.classList.add('shop-menu__sale');
      saleHTML.innerHTML = `$${String(menuItem.oldPrice)}`;

      textHTML.appendChild(costHTML);
      if (menuItem?.oldPrice) {
        textHTML.appendChild(saleHTML);
      }

      valueHTML.appendChild(iconHTML);
      valueHTML.appendChild(valueTextNode);

      itemHTML.appendChild(imgHTML);
      itemHTML.appendChild(valueHTML);
      itemHTML.appendChild(textHTML);

      this.content.appendChild(itemHTML);

      itemHTML.addEventListener('click', () => {
        this.callbackItemClick(menuItem);
      });
    });
  }
}
