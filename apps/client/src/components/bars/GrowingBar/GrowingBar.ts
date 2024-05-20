import { styles } from './GrowingBar.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import type Plant from '@entities/Plant';

import { _EVENTS } from '@constants/events';

@customElement('growing-plant')
export default class GrowingBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true, reflect: true })
  isshown: boolean;

  @property()
  private plant: Plant;

  constructor() {
    super();

    this.isshown = false;

    EventBus.on(_EVENTS.growing_plant_update, (plant: Plant) => {
      console.log('growing plant', plant);
      this.plant = plant;
      this.isshown = true;
      this.requestUpdate();
    });

    EventBus.on(_EVENTS.growing_plant_clear, () => {
      this.isshown = false;
      this.requestUpdate();
    });
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
      <img
        class="preview"
        src="./assets/plants/icons/${this.plant.title.toLowerCase()}.png"
        alt="icon"
      />
      
      <div class="content">
        <div class="info">
          <ul class="income">
            ${this._renderIncome()}
          </ul>
        </div>
      </div>
    </div> `;
  }
}
