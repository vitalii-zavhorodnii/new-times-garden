import { styles } from './styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('balance-bar')
export default class BalanceBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) public isShown: boolean;

  @property({ type: Number, reflect: true }) private coins: number;
  @property({ type: Number, reflect: true }) private tokens: number;
  @property({ type: Number, reflect: true }) private xp: number;

  constructor() {
    super();

    this.isShown = true;
    this.coins = 0;
    this.tokens = 0;
    this.xp = 0;
  }

  private _handleClick(): void {
    console.log('clicked +');
  }

  public render() {
    console.log('render', this.coins);

    return html` <div class="balance-bar ${this.isShown ? '' : 'hidden'}">
      <div class="balance-bar__cell">
        <span class="balance-bar__value">${this.xp}</span>
        <img
          class="balance-bar__icon"
          src="./assets/utils/experience.png"
          alt="xp"
        />
      </div>
      <div class="balance-bar__cell">
        <img class="balance-bar__icon" src="./assets/utils/coin.png" alt="coin" />
        <span class="balance-bar__value">${this.coins}</span>
      </div>
      <div class="balance-bar__cell">
        <img class="balance-bar__icon" src="./assets/utils/token.png" alt="coin" />
        <span class="balance-bar__value">${this.tokens}</span>
      </div>
      <div @click="${this._handleClick}" class="balance-bar__cell">
        <img class="balance-bar__icon" src="./assets/utils/plus.svg" alt="add" />
      </div>
    </div>`;
  }

  public changeProperties(coins: number, tokens: number, xp: number) {
    console.log('Change Properties', coins);

    this.coins = coins;
    this.tokens = tokens;
    this.xp = xp;

    this.requestUpdate('coins', this.coins);
  }

  public updated(changedProperties: Map<string, any>) {
    console.log({ changedProperties });

    changedProperties.forEach((oldValue, propName) => {
      console.log(`changle properties: ${propName} changed. oldValue: ${oldValue}`);
    });
  }
}
