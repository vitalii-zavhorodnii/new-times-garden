export default class BottomBar {
  public isShown: boolean;

  private container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.bottom-menu');
  }

  public show() {
    if (!this.isShown) {
      this.container.classList.remove('hidden');
      this.isShown = true;
    }
  }

  public hide() {
    if (this.isShown) {
      this.container.classList.add('hidden');
      this.isShown = false;
    }
  }
}
