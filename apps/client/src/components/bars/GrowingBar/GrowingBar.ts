import { styles } from './GrowingBar.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DateTime } from 'luxon';

import EventBus from '@emitter/EventBus';

import type Plant from '@entities/Plant';

import { timeReadableConverter } from '@helpers/time-coverter';

import { _EVENTS } from '@constants/events';

@customElement('growing-plant')
export default class GrowingBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true, reflect: true })
  isshown: boolean;

  @property({ type: String })
  private textLeft: string;

  @property()
  private intervalChecker: ReturnType<typeof setInterval>;

  @property()
  private plant: Plant;

  constructor() {
    super();

    this.isshown = false;
  }

  connectedCallback(): void {
    super.connectedCallback();

    EventBus.on(_EVENTS.growing_plant_update, (plant: Plant) => {
      this.plant = plant;

      clearInterval(this.intervalChecker);

      this.checkGrowingTime();
      this.intervalChecker = setInterval(() => {
        this.checkGrowingTime();
      }, 1000);

      this.isshown = true;
      this.requestUpdate();
    });

    EventBus.on(_EVENTS.growing_plant_clear, () => {
      clearInterval(this.intervalChecker);

      this.isshown = false;
      this.requestUpdate();
    });
  }

  checkGrowingTime() {
    if (!this.plant) return;

    // Destructuring Plant data in Soil
    const { plantedAt, growTime } = this.plant;
    // Calculate procent Left to complete
    const currentTime = DateTime.now();
    const endTime = DateTime.fromMillis(plantedAt + growTime);
    const difference = endTime.diff(currentTime).toMillis();

    if (difference <= 0) {
      clearInterval(this.intervalChecker);

      this.textLeft = 'Ready to harvest';
      this.requestUpdate();

      return;
    }

    const str = `Harvest in ${timeReadableConverter(difference)}`;
    this.textLeft = str;
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
        <div class="title">${this.plant.title}</div>
        <div class="info">${this.textLeft}</div>

        <ul class="income">
          ${this._renderIncome()}
        </ul>
      </div>
    </div> `;
  }
}
