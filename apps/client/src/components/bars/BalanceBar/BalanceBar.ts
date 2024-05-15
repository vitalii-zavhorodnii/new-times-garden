import { styles } from './styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('balance-bar')
export default class BalanceBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true, reflect: true })
  public isshown: boolean;

  @property({ type: Number, attribute: true, reflect: true }) public coins: number;
  @property({ type: Number, attribute: true, reflect: true }) public tokens: number;
  @property({ type: Number, attribute: true, reflect: true }) public xp: number;

  private element: Element;

  constructor() {
    super();

    this.coins = 0;
    this.tokens = 0;
    this.xp = 0;

    this.element = document.getElementsByTagName('balance-bar')[0];
  }

  private _handleClick(): void {
    console.log('clicked click handle');
  }

  public updateBalance(key: 'coins' | 'tokens', value: number | string) {
    this.element.setAttribute(key, String(value));
  }

  public toggleShown(value: boolean) {
    if (!value) {
      this.element.removeAttribute('isshown');
      return;
    }

    this.element.setAttribute('isshown', '');
  }

  public render() {
    return html` <div
      id="balance-bar"
      class="container ${this.isshown ? '' : 'hidden'}"
    >
      <div class="item">
        <span class="value">${this.xp}</span>
        <img class="icon" src="./assets/utils/experience.png" alt="xp" />
      </div>
      <div class="item">
        <img class="icon" src="./assets/utils/money.png" alt="coin" />
        <span class="value">${this.coins}</span>
      </div>
      <div class="item">
        <img class="icon" src="./assets/utils/token.png" alt="coin" />
        <span class="value">${this.tokens}</span>
      </div>
      <div @click="${this._handleClick}" class="item">
        <img class="icon" src="./assets/utils/plus.svg" alt="add" />
      </div>
    </div>`;
  }
}
