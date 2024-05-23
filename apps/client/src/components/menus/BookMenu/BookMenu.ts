import { styles } from './BookMenu.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { Swiper } from 'swiper';

import EventBus from '@emitter/EventBus';

import '@components/menus/BookMenu/AchieveItem';

import { _EVENTS } from '@constants/events';

import type { IUserAchievement } from '@interfaces/IUserData';

@customElement('book-menu')
export default class BookMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  isshown: boolean;

  @property({ type: Number })
  page: number;

  private swiper: Swiper;
  private achievements: IUserAchievement[];
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
    EventBus.on(_EVENTS.achieve_menu_update, (list: IUserAchievement[]) => {
      console.log({ list });
      this.achievements = list;
      this.requestUpdate();
    });
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
                  <div class="title">
                    Achievements
                  </div> 
                  <div class="description">
                    Complete challanges, achieve goals. Earn extra bucks, tokens and experience
                  </div>
                  ${this.renderAchievements()}
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

  renderAchievements() {
    if (!this.achievements.length) return html` <div>No achievements</div> `;

    return html`
      <div class="list">
        ${repeat(this.achievements, (achieve) => {
          console.log('achieve', achieve);
          return html`<achievement-item .item=${achieve}></achievement-item>`;
        })}
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
