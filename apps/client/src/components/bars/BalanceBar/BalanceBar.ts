import { styles } from './BalanceBar.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { _EVENTS } from '@constants/events';

@customElement('balance-bar')
export default class BalanceBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true })
  isshown: boolean;
  @property({ type: Boolean, attribute: true })
  isExpanded: boolean;

  @property({ type: Number, attribute: true })
  coins: number;
  @property({ type: Number, attribute: true })
  tokens: number;
  @property({ type: Number, attribute: true })
  xp: number;
  @property({ type: Number, attribute: true })
  playerLevel: number;

  @property()
  levelSteps: number[];

  constructor() {
    super();

    this.coins = 0;
    this.tokens = 0;
    this.xp = 0;
    this.playerLevel = 0;
    this.levelSteps = [];
    this.isExpanded = false;

    EventBus.on(_EVENTS.balance_update_coins, (value: number) => {
      this.coins = value;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_update_tokens, (value: number) => {
      this.tokens = value;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_lvl_steps_update, (value: number[]) => {
      this.levelSteps = value;
    });
    EventBus.on(_EVENTS.player_xp_update, (value: number) => {
      this.xp = value;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.player_level_update, (value: number) => {
      this.playerLevel = value;
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

  private _handleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  public render() {
    if (!this.levelSteps.length) return html``;

    return html` <div @click="${this._handleExpand}" class="container ${
      this.isshown ? '' : 'hidden'
    }">
      <div class="user">
        <div class="wrapper">
          <img class="plate" src="./assets/menu/lvl-plate.png" alt="plate" />
          <span class="level">${this.playerLevel}</span>
        </div>
        
        <span class="xp ${this.isExpanded ? 'expanded' : ''}">
          ${this.xp} / ${this.levelSteps[this.playerLevel + 1]}
        </span>
      </div>

      <div class="currency">
        <div class="item">
          <img class="icon" src="./assets/utils/money.png" alt="coin" />
          <span class="value">${this.coins}</span>
        </div>
        <div class="item">
          <img class="icon" src="./assets/utils/token.png" alt="coin" />
          <span class="value">${this.tokens}</span>
        </div>
        <div @click="${this._handleClick}" class="item">
          <img class="icon" src="./assets/utils/plus.svg" alt="add" />          </div>
        </div>
      </div>
    </div>`;
  }
}
