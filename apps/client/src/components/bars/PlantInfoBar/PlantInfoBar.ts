import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { styles } from './styles';

import { _EVENTS } from '@constants/events';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

@customElement('picked-plant')
export default class PlantInfoBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true, reflect: true })
  isshown: boolean;

  @property({ type: String, attribute: true, reflect: true })
  icon: string;
  @property({ type: Number, attribute: true, reflect: true })
  coinPrice: number;
  @property({ type: Number, attribute: true, reflect: true })
  tokenPrice: number;
  @property({ type: Number, attribute: true, reflect: true })
  timer: number;

  private data: IPlantListItem;

  constructor() {
    super();

    this.isshown = false;

    EventBus.on(_EVENTS.picked_plant_update, (plant: IPlantListItem) => {
      this.icon = plant.icon;
      this.coinPrice = plant.gamePrice;
      this.tokenPrice = plant.tokenPrice;
      this.timer = plant.growTime;
      this.data = plant;
      this.isshown = true;
      this.requestUpdate();
    });

    EventBus.on(_EVENTS.picked_plant_clear, () => {
      this.isshown = false;
      this.requestUpdate();
    });
  }

  _renderPrice() {
    if (this.coinPrice > 0) {
      return html`<p class="value">
        <img class="icon" src="./assets/utils/money.png" alt="coin" />
        ${this.coinPrice}
      </p>`;
    }

    if (this.tokenPrice > 0) {
      return html`<p class="value">
        <img class="icon" src="./assets/utils/token.png" alt="token" />
        ${this.tokenPrice}
      </p>`;
    }
  }

  _renderIncome() {
    if (this.data.coinsIncome > 0) {
      return html`<p class="value">
        <img class="icon" src="./assets/utils/money-profit.png" alt="coin" />
        ${this.data.coinsIncome}
      </p>`;
    }

    if (this.data.tokensIncome > 0) {
      return html`<p class="value">
        <img class="icon" src="./assets/utils/profit-tokens.svg" alt="token" />
        ${this.data.tokensIncome}
      </p>`;
    }
  }

  render() {
    return html`<div class="container ${this.isshown ? '' : 'hidden'}">
      <img class="preview" src="${this.icon}" alt="icon" />
      <div class="info">${this._renderPrice()}${this._renderIncome()}</div>
    </div> `;
  }
}
