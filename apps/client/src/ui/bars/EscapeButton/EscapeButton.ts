export default class EscapeButton {
  public isShown: boolean;

  private callback: Function;
  private container: HTMLElement;

  constructor(callback: Function) {
    this.container = document.getElementById('escape');

    this.callback = callback;
    
    this.container.addEventListener('click', () => {
      this.callback();
    });
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
