import { markup } from './markup';
import EventBus from '@emitter/EventBus';

import { _EVENTS } from '@constants/events';

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

    EventBus.on(_EVENTS.shop_menu_open, () => {
      this.isOpen = true;
      this.container.classList.remove('hidden');
    });
    EventBus.on(_EVENTS.shop_menu_close, () => {
      this.isOpen = false;
      this.container.classList.add('hidden');
    });
  }

  private createMarkup() {
    const listHTML = document.createElement('ul');
    listHTML.classList.add('shop-menu__container');

    const list = this.shopList.map((menuItem) => {
      const itemHTML = document.createElement('li');
      itemHTML.classList.add('shop-menu__item');

      itemHTML.innerHTML = markup(
        menuItem.img,
        menuItem.value,
        menuItem.price,
        menuItem.oldPrice
      );

      itemHTML.addEventListener('click', () => {
        this.callbackItemClick(menuItem);
      });

      return itemHTML;
    });

    list.forEach((item) => {
      listHTML.appendChild(item);
    });

    this.content.appendChild(listHTML);
  }
}
