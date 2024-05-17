import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import 'src/components/menus/PlantsMenu';

import EventBus from '@emitter/EventBus';

import { styles } from './styles';

import { timeReadableConverter } from '@helpers/time-coverter';

import { _EVENTS } from '@constants/events';

import type { IPlantListItem, IPlantsList } from '@interfaces/IPlantListItem';

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

  @property({ type: String })
  balanceCoins: number;

  @property({ type: String })
  balanceTokens: number;

  private list: IPlantsList;

  constructor() {
    super();

    this.isshown = false;
    this.list = null;

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

  handleSeedPick(item: IPlantListItem) {
    if (this.balanceCoins < item.gamePrice) return;
    if (this.balanceTokens < item.tokenPrice) return;

    EventBus.emit(_EVENTS.picked_plant_update, item);
    EventBus.emit(_EVENTS.plant_menu_close);
    EventBus.emit(_EVENTS.ring_set_escape);
  }

  _handleClick() {
    console.log('handle');
    // EventBus.emit(_EVENTS.plant_menu_close);
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
      <swiper-container slides-per-view="1" loop="false">
      <swiper-slide><div class="list">
      ${repeat(this.list.simple, (item) => {
        const growingString = timeReadableConverter(item.growTime);
        const isDisabled =
          this.balanceCoins < item.gamePrice || this.balanceTokens < item.tokenPrice;

        return html`
          <div @click=${() => this.handleSeedPick(item)} class="plant-item ${
          isDisabled ? 'disabled' : ''
        }">
            <img
              class="image"
              src="./assets/plants/icons/${item.texture.toLowerCase()}.png"
              alt="icon"
            />

            <div class="about">
              <div class="title ${isDisabled ? 'disabled' : ''}">${item.title}</div>
              <div class="grow-time ${
                isDisabled ? 'disabled' : ''
              }">Growing time: ${growingString}</div>

              <div class="stats">
                <div
                  class="value ${item.gamePrice ? '' : 'none'} ${
          this.balanceCoins < item.gamePrice ? 'red' : ''
        }"
                >
                  <img class="icon" src="./assets/utils/money.png" alt="coin" />
                  ${item.gamePrice}
                </div>

                <div class="value ${item.tokenPrice ? '' : 'none'} ${
          this.balanceTokens < item.tokenPrice ? 'red' : ''
        }"">
                  <img class="icon" src="./assets/utils/token.png" alt="token" />
                  ${item.tokenPrice}
                </div>

                <div class="value ${item.coinsIncome ? '' : 'none'} ${
          isDisabled ? 'disabled' : ''
        }">
                  <img
                    class="icon"
                    src="./assets/utils/money-profit.png"
                    alt="money-income"
                  />
                  ${item.coinsIncome}
                </div>

                <div class="value ${item.tokensIncome ? '' : 'none'} ${
          isDisabled ? 'disabled' : ''
        }">
                  <img
                    class="icon"
                    src="./assets/utils/profit-tokens.svg"
                    alt="token-income"
                  />
                  ${item.tokensIncome}
                </div>

                <div class="value ${item.xpIncome ? '' : 'none'} ${
          isDisabled ? 'disabled' : ''
        }">
                  <img class="icon" src="./assets/utils/experience.png" alt="xp" />
                  ${item.xpIncome}
                </div>
              </div>
            </div>
          </div>
        `;
      })}</swiper-slide>
        <swiper-slide><div class="list">
      ${repeat(this.list.simple, (item) => {
        const growingString = timeReadableConverter(item.growTime);
        const isDisabled =
          this.balanceCoins < item.gamePrice || this.balanceTokens < item.tokenPrice;

        return html`
          <div @click=${() => this.handleSeedPick(item)} class="plant-item ${
          isDisabled ? 'disabled' : ''
        }">
            <img
              class="image"
              src="./assets/plants/icons/${item.texture.toLowerCase()}.png"
              alt="icon"
            />

            <div class="about">
              <div class="title ${isDisabled ? 'disabled' : ''}">${item.title}</div>
              <div class="grow-time ${
                isDisabled ? 'disabled' : ''
              }">Growing time: ${growingString}</div>

              <div class="stats">
                <div
                  class="value ${item.gamePrice ? '' : 'none'} ${
          this.balanceCoins < item.gamePrice ? 'red' : ''
        }"
                >
                  <img class="icon" src="./assets/utils/money.png" alt="coin" />
                  ${item.gamePrice}
                </div>

                <div class="value ${item.tokenPrice ? '' : 'none'} ${
          this.balanceTokens < item.tokenPrice ? 'red' : ''
        }"">
                  <img class="icon" src="./assets/utils/token.png" alt="token" />
                  ${item.tokenPrice}
                </div>

                <div class="value ${item.coinsIncome ? '' : 'none'} ${
          isDisabled ? 'disabled' : ''
        }">
                  <img
                    class="icon"
                    src="./assets/utils/money-profit.png"
                    alt="money-income"
                  />
                  ${item.coinsIncome}
                </div>

                <div class="value ${item.tokensIncome ? '' : 'none'} ${
          isDisabled ? 'disabled' : ''
        }">
                  <img
                    class="icon"
                    src="./assets/utils/profit-tokens.svg"
                    alt="token-income"
                  />
                  ${item.tokensIncome}
                </div>

                <div class="value ${item.xpIncome ? '' : 'none'} ${
          isDisabled ? 'disabled' : ''
        }">
                  <img class="icon" src="./assets/utils/experience.png" alt="xp" />
                  ${item.xpIncome}
                </div>
              </div>
            </div>
          </div>
        `;
      })}</swiper-slide>
      </swiper-container>
      
    </paper-modal> `;
  }

  renderStats() {
    return html``;
  }
}

// ${coins > 0
//   ? ``
//   : ''}
// ${tokens > 0
//   ? ``
//   : ''}
// ${coinsIncome > 0
//   ? `<p class="plants-menu__value">
//   <img
//     class="plants-menu__stat-icon"
//     src="./assets/utils/money-profit.png"
//     alt="coin"
//   >
//   ~${coinsIncome}
// </p>`
//   : ''}
// ${tokensIncome > 0
//   ? `<p class="plants-menu__value">
//   <img
//     class="plants-menu__stat-icon"
//     src="./assets/utils/profit-tokens.svg"
//     alt="token"
//   >
//   ~${tokensIncome}
// </p>`
//   : ''}
// ${xpIncome > 0
//   ? `<p class="plants-menu__value">
//   <img
//     class="plants-menu__stat-icon"
//     src="./assets/utils/experience.png"
//     alt="coin"
//   >
//   ~${xpIncome}
// </p>`
//   : ''}
