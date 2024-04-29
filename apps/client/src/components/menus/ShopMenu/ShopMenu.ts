import type { IShopItem } from '@interfaces/IShopItem';

export default class ShopMenu {
  public isOpen: boolean;
  public shopList: IShopItem[];

  private container: HTMLElement;
  private closeButton: HTMLElement;
  private listContainer: HTMLElement;

  constructor(list: IShopItem[]) {
    this.isOpen = false;

    this.container = document.querySelector('.shop-menu');
    this.listContainer = document.querySelector('.shop-menu__list');
    this.closeButton = document.querySelector('.shop-menu__btn-close');

    this.shopList = list;

    this.closeButton.addEventListener('click', () => {
      this.close();
    });

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
    console.log({ i: this.listContainer });
  }
}
