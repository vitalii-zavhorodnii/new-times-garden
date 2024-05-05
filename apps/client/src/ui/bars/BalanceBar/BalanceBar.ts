export default class BalanceBar {
  public isShown: boolean;

  private coins: HTMLElement;
  private tokens: HTMLElement;
  private xp: HTMLElement;
  private container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.balance-bar');
    this.coins = document.getElementById('coin-balance');
    this.tokens = document.getElementById('token-balance');
    this.xp = document.getElementById('xp-balance');
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
    this.coins.innerHTML = String(value);
  }

  public setTokens(value: number) {
    this.tokens.innerHTML = String(value);
  }

  public setLevel(value: number) {
    const level = value;
    const currentXp = value;
    this.xp.innerHTML = String(level);
  }
}
