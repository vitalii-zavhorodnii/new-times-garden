import { styles } from './PlantsMenu.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { Swiper } from 'swiper';

import EventBus from '@emitter/EventBus';

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
    'Buy seeds and grow your garden. Harvest bucks and experience when plant is ready';

  @property({ type: Number })
  balanceCoins: number;

  @property({ type: Number })
  balanceTokens: number;

  @property({ type: Number })
  playerLevel: number;

  @property({ type: Number })
  page: number;

  private paginationInView: boolean;
  private list: IPlantsList;
  private swiper: Swiper;

  constructor() {
    super();

    this.isshown = false;
    this.list = null;
    this.page = 0;
  }

  connectedCallback(): void {
    super.connectedCallback();

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
    EventBus.on(_EVENTS.player_level_update, (value: number) => {
      this.playerLevel = value;
      this.requestUpdate();
    });
  }

  _handlePage(page: number) {
    this.swiper.slideTo(page);
  }

  render() {
    if (!this.list) return html``;

    return html`<paper-modal
      title=${this.title}
      description=${this.description}
      ?isshown=${this.isshown}
      balanceCoins=${this.balanceCoins}
      balanceTokens=${this.balanceTokens}
      playerLevel=${this.playerLevel}
    >
      <div id="top"></div>
      <div class="balance" id="balance">
        <div class="balance-value">
          <img class="balance-icon" src="./assets/utils/money.png" alt="coin" />
          ${this.balanceCoins}
        </div>

        <div class="balance-value">
          <img class="balance-icon" src="./assets/utils/token.png" alt="token" />
          ${this.balanceTokens}
        </div>
      </div>

      <div class="pagination" id="pagination">
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
      ${this.renderSwiper()}
    </paper-modal> `;
  }

  renderSwiper() {
    return html`<swiper-container
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
              playerLevel=${this.playerLevel}
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
              playerLevel=${this.playerLevel}
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
              playerLevel=${this.playerLevel}
            ></plant-item>`;
          })}
        </div>
      </swiper-slide>
    </swiper-container>`;
  }

  protected updated(): void {
    this.defineObserver();
    this.defineSwiper();
  }

  protected defineObserver() {
    // Define target to observe
    const target = this.shadowRoot.getElementById('pagination');
    // Stop if no target found
    if (!target) return;
    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.paginationInView = true;
          } else {
            this.paginationInView = false;
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(target);
  }

  protected defineSwiper() {
    // Defining swiper slide chabger
    const swiper = this.shadowRoot.querySelector('swiper-container');
    // stop if no swiper defined
    if (!swiper) return;
    if (this.swiper) return;
    // Find slider and define to this
    // Chnage current page depends on Slide
    this.swiper = swiper.swiper;
    this.swiper.on('slideChange', (swiper) => {
      this.page = swiper.activeIndex;

      if (!this.paginationInView) {
        const scrollElement = this.shadowRoot.getElementById('top');
        scrollElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}
