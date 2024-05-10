export default class BottomBar {
  public isShown: boolean;

  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById('bottom-bar');
  }

  public show() {
    this.container.classList.remove('hidden');
    this.isShown = true;
  }

  public hide() {
    this.container.classList.add('hidden');
    this.isShown = false;
  }
}
