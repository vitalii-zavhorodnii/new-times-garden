import { styles } from './PlantInfoBar.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { timeReadableConverter } from 'src/helpers/time-coverter';

import EventBus from '@emitter/EventBus';

import { _EVENTS } from '@constants/events';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

@customElement('picked-plant')
export default class PlantInfoBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  private isshown: boolean;

  @property()
  private plant: IPlantListItem;

  constructor() {
    super();

    this.isshown = false;
  }

  connectedCallback(): void {
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
  }
  _renderTokens() {
    if (this.plant.tokenPrice > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/token.png" alt="token" />
        ${this.plant.tokenPrice}
      </li>`;
    }
  }

  _renderCoinsIncome() {
    if (this.plant.coinsIncome > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/money-profit.png" alt="coin" />
        ${this.plant.coinsIncome}
      </li>`;
    }
  }

  _renderTokensIncome() {
    if (this.plant.tokensIncome > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/profit-tokens.svg" alt="token" />
        ${this.plant.tokensIncome}
      </li>`;
    }
  }

  _renderXpIncome() {
    if (this.plant.xpIncome > 0) {
      return html`<li class="value">
        <img class="value-icon" src="./assets/utils/experience.png" alt="token" />
        ${this.plant.xpIncome}
      </li>`;
    }
  }

  render() {
    if (!this.plant) {
      return html``;
    }

    const growingText = timeReadableConverter(this.plant.growTime);

    return html`<div class="container ${this.isshown ? '' : 'closed'}">
      <div class="wrapper">
        <img class="shield" src="./assets/utils/shield.png" alt="shield" />
        <img
          class="preview"
          src="./assets/plants/icons/${this.plant.title.toLowerCase()}.png"
          alt="icon"
        />

        <div class="content">
          <div class="title">${this.plant.title}</div>
          <div class="growing">${growingText} ${this._renderXpIncome()}</div>

          <ul class="income">
            ${this._renderPrice()} ${this._renderTokens()}
            ${this._renderCoinsIncome()} ${this._renderTokensIncome()}
          </ul>
        </div>
      </div>
    </div> `;
  }
}
