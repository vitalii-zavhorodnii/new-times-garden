export default class SeedsMenu {
  public isOpen: boolean;

  private container: HTMLElement;
  private openButton: HTMLElement;
  private closeButton: HTMLElement;

  constructor() {
    this.isOpen = false;

    this.container = document.querySelector('.side-menu');
    this.openButton = document.querySelector('.side-menu__btn-open');
    this.closeButton = document.querySelector('.side-menu__btn-close');

    this.openButton.addEventListener('click', () => {
      this.open();
    });

    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  public open() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.container.style.left = '0';
    }
  }

  public close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.container.style.left = '-100vw';
    }
  }
}
