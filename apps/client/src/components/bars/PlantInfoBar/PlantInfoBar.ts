import { styles } from './styles';
import EventBus from '@emitter/EventBus';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IPlantListItem } from 'src/interfaces/IPlantListItem';

import { _EVENTS } from '@constants/events';

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

  // private data: IPlantListItem;

  constructor() {
    super();

    this.isshown = false;

    EventBus.on(_EVENTS.picked_plant_update, (plant: IPlantListItem) => {
      console.log({ plant });
      // this.data = data;
      this.icon = plant.icon;
      this.coinPrice = plant.gamePrice;
      this.tokenPrice = plant.tokenPrice;
      this.timer = plant.growTime;
      this.isshown = true;
      this.requestUpdate();
    });
  }

  retnder() {
    return html`<div class="container ${this.isshown ? '' : 'hidden'}">
      <img class="preview" src="${this.icon}" alt="icon" />
      <div class="info">
        ${this.coinPrice > 0
          ? `<p class="value">
            <img class="icon" 
              src="./assets/utils/money.png" 
              alt="coin"
            >
            ${this.coinPrice}
          </p>`
          : ''}
        ${this.tokenPrice > 0
          ? `<p class="value">
            <img class="icon" 
              src="./assets/utils/token.png" 
              alt="token"
            >
            ${this.tokenPrice}
          </p>`
          : ''}
      </div>
    </div> `;
  }
}
