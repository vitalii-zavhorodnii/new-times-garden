export default class BalanceBar {
  public isShown: boolean;

  private coins: HTMLElement;
  private tokens: HTMLElement;
  private container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.balance-bar');
    this.coins = document.getElementById('coin-balance');
    this.tokens = document.getElementById('token-balance');
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

  public setCoins(value: number) {
    console.log({ value });
    this.coins.innerHTML = String(value);
  }

  public setTokens(value: number) {
    this.tokens.innerHTML = String(value);
  }
}
