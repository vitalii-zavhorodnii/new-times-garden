import { styles } from './PlantInfoBar.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { _EVENTS } from '@constants/events';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

@customElement('picked-plant')
export default class PlantInfoBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true, reflect: true })
  isshown: boolean;

  @property()
  private plant: IPlantListItem;

  constructor() {
    super();

    this.isshown = false;
  }

  connectedCallback() {
    super.connectedCallback();

    EventBus.on(_EVENTS.picked_plant_update, (plant: IPlantListItem) => {
      this.plant = plant;

      this.isshown = true;
      this.requestUpdate();
    });

    EventBus.on(_EVENTS.picked_plant_clear, () => {
      this.isshown = false;
      this.requestUpdate();
    });
  }

  _renderPrice() {
    if (this.plant.gamePrice > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/money.png" alt="coin" />
        ${this.plant.gamePrice}
      </li>`;
    }

    if (this.plant.tokenPrice > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/token.png" alt="token" />
        ${this.plant.tokenPrice}
      </li>`;
    }
  }

  _renderIncome() {
    if (this.plant.coinsIncome > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/money-profit.png" alt="coin" />
        ${this.plant.coinsIncome}
      </li>`;
    }

    if (this.plant.tokensIncome > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/profit-tokens.svg" alt="token" />
        ${this.plant.tokensIncome}
      </li>`;
    }
  }

  render() {
    if (!this.plant) {
      return html``;
    }

    return html`<div class="container ${this.isshown ? '' : 'hidden'}">
      <div class="content">
        <img
          class="preview"
          src="./assets/plants/icons/${this.plant.texture}.png"
          alt="icon"
        />
        <div class="info">
          <ul class="income">
            ${this._renderPrice()} ${this._renderIncome()}
          </ul>
        </div>
      </div>
    </div> `;
  }
}
