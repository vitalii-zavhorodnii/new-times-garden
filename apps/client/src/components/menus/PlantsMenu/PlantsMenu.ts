import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { Swiper } from 'swiper';

import EventBus from '@emitter/EventBus';

import { styles } from './PlantsMenu.styles';
import '@components/menus/PlantsMenu/PlantItem';

import { _EVENTS } from '@constants/events';

import type { IPlantsList } from '@interfaces/IPlantListItem';

@customElement('plants-menu')
export default class PlantsMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  isshown: boolean;

  @property({ type: String })
  title = 'Seeds Shop';

  @property({ type: String })
  description =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, cupiditate cum minus';

  @property({ type: Number })
  balanceCoins: number;

  @property({ type: Number })
  balanceTokens: number;

  @property({ type: Number })
  page: number;

  private list: IPlantsList;
  private slider: Swiper;

  constructor() {
    super();

    this.isshown = false;
    this.list = null;
    this.page = 0;

    EventBus.on(_EVENTS.plant_menu_open, () => {
      this.isshown = true;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.plant_menu_close, () => {
      this.isshown = false;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.plant_menu_update, (plantsList: IPlantsList) => {
      this.list = plantsList;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_update_coins, (value: number) => {
      this.balanceCoins = value;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.balance_update_tokens, (value: number) => {
      this.balanceTokens = value;
      this.requestUpdate();
    });
  }

  _handlePage(page: number) {
    this.page = page;
    this.slider.slideTo(page);
  }

  handleChangeSlide() {
    console.log('handleChangeSlide');
  }

  protected updated(): void {
    const slider = this.shadowRoot.querySelector('swiper-container');

    if (!slider) return;
    if (this.slider) return;

    this.slider = slider.swiper;
  }

  render() {
    if (!this.list) return html``;

    return html`<paper-modal
      title=${this.title}
      description=${this.description}
      ?isshown=${this.isshown}
      balanceCoins=${this.balanceCoins}
      balanceTokens=${this.balanceTokens}
    >
      <div class="balance">
        <div class="balance-value">
          <img class="balance-icon" src="./assets/utils/money.png" alt="coin" />
          ${this.balanceCoins}
        </div>

        <div class="balance-value">
          <img class="balance-icon" src="./assets/utils/token.png" alt="token" />
          ${this.balanceTokens}
        </div>
      </div>
      <div class="pagination">
        <div
          @click=${() => this._handlePage(0)}
          class="page ${this.page === 0 ? 'active' : ''}"
        >
          Simple
        </div>
        <div
          @click=${() => this._handlePage(1)}
          class="page ${this.page === 1 ? 'active' : ''}"
        >
          Advanced
        </div>
        <div
          @click=${() => this._handlePage(2)}
          class="page ${this.page === 2 ? 'active' : ''}"
        >
          Special
        </div>
      </div>
      ${this.renderSlider()}
    </paper-modal> `;
  }

  renderSlider() {
    return html`<swiper-container
      id="slider"
      active=${this.page}
      slides-per-view="1"
      loop="false"
      lazy="true"
    >
      <swiper-slide>
        <div class="list">
          ${repeat(this.list.simple, (plant) => {
            return html`<plant-item
              .plant=${plant}
              balanceCoins=${this.balanceCoins}
              balanceTokens=${this.balanceTokens}
            ></plant-item>`;
          })}
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="list">
          ${repeat(this.list.advanced, (plant) => {
            return html`<plant-item
              .plant=${plant}
              balanceCoins=${this.balanceCoins}
              balanceTokens=${this.balanceTokens}
            ></plant-item>`;
          })}
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="list">
          ${repeat(this.list.special, (plant) => {
            return html`<plant-item
              .plant=${plant}
              balanceCoins=${this.balanceCoins}
              balanceTokens=${this.balanceTokens}
            ></plant-item>`;
          })}
        </div>
      </swiper-slide>
    </swiper-container>`;
  }
}
