import { styles } from './styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('balance-bar')
export default class BalanceBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) public isShown = true;

  @property({ type: Number }) public coins: 0;
  @property({ type: Number }) public tokens: 0;
  @property({ type: Number }) public xp: 0;

  render() {
    return html` <div class="balance-bar ${this.isShown ? '' : 'hidden'}">
      <div class="balance-bar__cell">
        <span class="balance-bar__value" id="xp-balance">0</span>
        <img
          class="balance-bar__icon"
          src="./assets/utils/experience.png"
          alt="xp"
        />
      </div>
      <div class="balance-bar__cell">
        <img class="balance-bar__icon" src="./assets/utils/coin.png" alt="coin" />
        <span class="balance-bar__value" id="coin-balance">0</span>
      </div>
      <div class="balance-bar__cell">
        <img class="balance-bar__icon" src="./assets/utils/token.png" alt="coin" />
        <span class="balance-bar__value" id="token-balance">0</span>
      </div>
      <div id="shop-menu-open" class="balance-bar__cell">
        <img class="balance-bar__icon" src="./assets/utils/plus.svg" alt="add" />
      </div>
    </div>`;
  }
}

const tag = document.createElement('balance-bar');
document.body.appendChild(tag);
