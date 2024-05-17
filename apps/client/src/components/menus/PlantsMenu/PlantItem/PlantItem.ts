import { styles } from './PlantItem.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { timeReadableConverter } from '@helpers/time-coverter';

import { _EVENTS } from '@constants/events';

import type { IPlantListItem } from '@interfaces/IPlantListItem';

@customElement('plant-item')
export default class PlantsMenu extends LitElement {
  static styles = styles;

  @property({ type: Number })
  balanceCoins: number;

  @property({ type: Number })
  balanceTokens: number;

  @property({ attribute: true })
  plant: IPlantListItem;

  constructor() {
    super();

    this.balanceCoins = 0;
    this.balanceTokens = 0;
  }

  handleSeedPick(item: IPlantListItem) {
    if (this.balanceCoins < this.plant.gamePrice) return;
    if (this.balanceTokens < this.plant.tokenPrice) return;

    EventBus.emit(_EVENTS.picked_plant_update, item);
    EventBus.emit(_EVENTS.plant_menu_close);
    EventBus.emit(_EVENTS.ring_set_escape);
  }

  render() {
    if (!this.plant) return html``;

    const growingString = timeReadableConverter(this.plant.growTime);
    const isDisabled =
      this.balanceCoins < this.plant.gamePrice ||
      this.balanceTokens < this.plant.tokenPrice;

    return html`
      <div
        @click=${() => this.handleSeedPick(this.plant)}
        class="plant-item ${isDisabled ? 'disabled' : ''}"
      >
        <img
          class="image"
          src="./assets/plants/icons/${this.plant.texture.toLowerCase()}.png"
          alt="icon"
        />

        <div class="about">
          <div class="title ${isDisabled ? 'disabled' : ''}">
            ${this.plant.title}
          </div>
          <div class="grow-time ${isDisabled ? 'disabled' : ''}">
            Growing: ${growingString}
          </div>

          <div class="stats">
            <div
              class="value 
                    ${this.plant.gamePrice ? '' : 'none'} 
                    ${this.balanceCoins < this.plant.gamePrice ? 'red' : ''}"
            >
              <img class="icon" src="./assets/utils/money.png" alt="coin" />
              ${this.plant.gamePrice}
            </div>

            <div
              class="value 
                  ${this.plant.tokenPrice ? '' : 'none'} 
                  ${this.balanceTokens < this.plant.tokenPrice ? 'red' : ''}"
            >
              <img class="icon" src="./assets/utils/token.png" alt="token" />
              ${this.plant.tokenPrice}
            </div>

            <div
              class="value ${this.plant.coinsIncome ? '' : 'none'} ${isDisabled
                ? 'disabled'
                : ''}"
            >
              <img
                class="icon"
                src="./assets/utils/money-profit.png"
                alt="money-income"
              />
              ${this.plant.coinsIncome}
            </div>

            <div
              class="value ${this.plant.tokensIncome ? '' : 'none'} ${isDisabled
                ? 'disabled'
                : ''}"
            >
              <img
                class="icon"
                src="./assets/utils/profit-tokens.svg"
                alt="token-income"
              />
              ${this.plant.tokensIncome}
            </div>

            <div
              class="value ${this.plant.xpIncome ? '' : 'none'} ${isDisabled
                ? 'disabled'
                : ''}"
            >
              <img class="icon" src="./assets/utils/experience.png" alt="xp" />
              ${this.plant.xpIncome}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
