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

  @property({ type: Number, attribute: true })
  balanceCoins: number;

  @property({ type: Number, attribute: true })
  balanceTokens: number;

  @property({ type: Number, attribute: true })
  playerLevel: number;

  private plant: IPlantListItem;

  constructor() {
    super();

    this.balanceCoins = 0;
    this.balanceTokens = 0;
    this.playerLevel = 0;
  }

  handleSeedPick(item: IPlantListItem) {
    if (this.playerLevel < item.requiredLevel) return;
    if (this.balanceCoins < this.plant.gamePrice) return;
    if (this.balanceTokens < this.plant.tokenPrice) return;

    EventBus.emit(_EVENTS.picked_plant_update, item);
    EventBus.emit(_EVENTS.plant_menu_close);
    EventBus.emit(_EVENTS.ring_set_escape);
  }

  render() {
    if (!this.plant) return html``;

    const isAllowed = this.playerLevel >= this.plant.requiredLevel;

    const isInsufficient =
      this.balanceCoins < this.plant.gamePrice ||
      this.balanceTokens < this.plant.tokenPrice;

    const growingString = timeReadableConverter(this.plant.growTime);

    return html`
      <div @click=${() => this.handleSeedPick(this.plant)} class="plant-item">
        <img
          class="locker ${isAllowed ? 'hidden' : ''}"
          src="./assets/utils/lock.png"
          alt="lock"
        />
        <img
          class="image"
          src="./assets/plants/icons/${isAllowed ? '' : 'disabled/'}${this.plant
            .texture}.png"
          alt="icon"
        />

        <div class="about">
          <div
            class="title ${this.plant.title ? '' : 'hidden'} ${isInsufficient
              ? 'insufficient'
              : ''} ${isAllowed ? '' : 'locked'}"
          >
            ${this.plant.title}
          </div>
          <div class="required ${isAllowed ? 'hidden' : ''}">
            Required level: ${this.plant.requiredLevel}
          </div>
          <div class="grow-time ${!isAllowed ? 'hidden' : ''}">
            Growing: ${growingString}
          </div>

          <div class="stats">
            <div
              class="value ${this.plant.gamePrice ? '' : 'hidden'} ${isInsufficient
                ? 'insufficient'
                : ''} ${isAllowed ? '' : 'locked'}"
            >
              <img class="icon" src="./assets/utils/money.png" alt="coin" />
              ${this.plant.gamePrice}
            </div>

            <div
              class="value ${this.plant.tokenPrice ? '' : 'hidden'} ${isInsufficient
                ? 'insufficient'
                : ''} ${isAllowed ? '' : 'locked'}"
            >
              <img class="icon" src="./assets/utils/token.png" alt="token" />
              ${this.plant.tokenPrice}
            </div>

            <div
              class="value ${this.plant.coinsIncome ? '' : 'hidden'} ${isInsufficient
                ? 'locked'
                : ''} ${isAllowed ? '' : 'locked'}"
            >
              <img
                class="icon"
                src="./assets/utils/money-profit.png"
                alt="money-income"
              />
              ${this.plant.coinsIncome}
            </div>

            <div
              class="value ${this.plant.tokensIncome
                ? ''
                : 'hidden'} ${isInsufficient ? 'locked' : ''} ${isAllowed
                ? ''
                : 'locked'}"
            >
              <img
                class="icon"
                src="./assets/utils/profit-tokens.svg"
                alt="token-income"
              />
              ${this.plant.tokensIncome}
            </div>

            <div
              class="value ${this.plant.xpIncome ? '' : 'none'} ${isInsufficient
                ? 'locked'
                : ''} ${isAllowed ? '' : 'locked'}"
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
