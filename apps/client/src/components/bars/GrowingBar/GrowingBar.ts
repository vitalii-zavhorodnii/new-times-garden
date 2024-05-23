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

  @property()
  private plant: Plant;

  @property({ type: String })
  private textLeft: string;

  @property()
  private intervalChecker: ReturnType<typeof setInterval>;

  @property({ type: Boolean })
  private isready: boolean;

  constructor() {
    super();

    this.isshown = false;
    this.isready = false;
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

      this.isready = true;
      this.textLeft = 'Ready to harvest';

      return;
    }

    this.isready = false;
    this.textLeft = `${timeReadableConverter(difference)}`;
  }

  _renderСoinsIncome() {
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

    return html`<div class="container ${this.isshown ? '' : 'hidden'}">
      <div class="wrapper">
        <img class="shield" src="./assets/utils/shield.png" alt="shield" />
        <img
          class="preview"
          src="./assets/plants/icons/${this.plant.title.toLowerCase()}.png"
          alt="icon"
        />

        <div class="content">
          <div class="title">${this.plant.title}</div>
          <div class="growing ${this.isready ? 'ready' : ''}">${this.textLeft}</div>

          <ul class="income">
            ${this._renderСoinsIncome()} ${this._renderTokensIncome()}
            ${this._renderXpIncome()}
          </ul>
        </div>
      </div>
    </div> `;
  }
}
