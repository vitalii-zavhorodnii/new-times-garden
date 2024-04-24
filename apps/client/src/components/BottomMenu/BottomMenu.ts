export default class BottomMenu {
  public isShown: boolean;

  private container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.bottom-menu');
  }

  public hide() {
    if (this.isShown) {
      this.container.style.left = '-100vw';
    }
  }

  public open() {
    if (!this.isShown) {
      this.container.style.left = '0';
    }
  }

  private renderMenu() {

  }
}
