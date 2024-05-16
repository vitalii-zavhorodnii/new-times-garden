import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { styles } from './styles';

import { _EVENTS } from '@constants/events';

@customElement('balance-bar')
export default class BalanceBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true, reflect: true })
  isshown: boolean;

  @property({ type: Number, attribute: true, reflect: true })
  coins: number;
  @property({ type: Number, attribute: true, reflect: true })
  tokens: number;
  @property({ type: Number, attribute: true, reflect: true })
  xp: number;

  constructor() {
    super();

    this.coins = 0;
    this.tokens = 0;
    this.xp = 0;

    EventBus.on(_EVENTS.balance_update_coins, (value: number) => {
      this.coins = value;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_update_tokens, (value: number) => {
      this.tokens = value;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_update_xp, (value: number) => {
      this.xp = value;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_show, () => {
      this.isshown = true;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_hide, () => {
      this.isshown = false;
      this.requestUpdate();
    });
  }

  private _handleClick(): void {
    EventBus.emit(_EVENTS.shop_menu_open);
  }

  public render() {
    return html` <div class="container ${this.isshown ? '' : 'hidden'}">
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
