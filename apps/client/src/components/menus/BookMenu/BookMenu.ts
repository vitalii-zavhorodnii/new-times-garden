import { styles } from './BookMenu.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { Swiper } from 'swiper';

import EventBus from '@emitter/EventBus';

import { _EVENTS } from '@constants/events';

@customElement('book-menu')
export default class BookMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  isshown: boolean;

  @property({ type: Number })
  page: number;

  private swiper: Swiper;
  private achievements: string[];
  private quests: string[];

  constructor() {
    super();

    this.isshown = false;
    this.achievements = [];
    this.quests = [];
    this.page = 0;
  }

  connectedCallback(): void {
    super.connectedCallback();

    EventBus.on(_EVENTS.book_menu_open, () => {
      this.isshown = true;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.book_menu_close, () => {
      this.isshown = false;
      this.requestUpdate();
    });
    // EventBus.on(_EVENTS.plant_menu_update, (plantsList: IPlantsList) => {
    //   this.list = plantsList;
    //   this.requestUpdate();
    // });
    // EventBus.on(_EVENTS.balance_update_coins, (value: number) => {
    //   this.balanceCoins = value;
    //   this.requestUpdate();
    // });
    // EventBus.on(_EVENTS.balance_update_tokens, (value: number) => {
    //   this.balanceTokens = value;
    //   this.requestUpdate();
    // });
  }

  handleClose() {
    EventBus.emit(_EVENTS.book_menu_close);
  }

  render() {
    return html`
      <div class="container ${this.isshown ? '' : 'hidden'}">
          <swiper-container
            id="book"
            active=${this.page}
            slides-per-view="1"
            loop="false"
            lazy="true"
          >
            <swiper-slide>
              <div class="page left">
                <img @click=${
                  this.handleClose
                } class="close-btn left" src="./assets/utils/cross.png" alt="close"/>
                <img class="decor left" src="./assets/book/book-decor-left.png" alt="decor" />
                <img class="decor center" src="./assets/book/book-decor-center.png" alt="decor" />
                <div class="content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur vel numquam veritatis aperiam assumenda eaque illum
                  minima natus dignissimos voluptates asperiores sed, sequi id
                  officia unde possimus delectus doloribus dicta?
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="page right">
                <img @click=${
                  this.handleClose
                } class="close-btn right" src="./assets/utils/cross.png" alt="close"/>
                <img class="decor right" src="./assets/book/book-decor-right.png" alt="decor" />
                <div class="content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur vel numquam veritatis aperiam assumenda eaque illum
                  minima natus dignissimos voluptates asperiores sed, sequi id
                  officia unde possimus delectus doloribus dicta?
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
          </swiper-container>
      </div>
    `;
  }

  protected updated(): void {
    const swiper = this.shadowRoot.querySelector('swiper-container');

    if (!swiper) return;
    if (this.swiper) return;
    // Find slider and define to this
    // Chnage current page depends on Slide
    this.swiper = swiper.swiper;
    this.swiper.on('slideChange', (swiper) => {
      console.log('change');
      this.page = swiper.activeIndex;
    });
  }
}
