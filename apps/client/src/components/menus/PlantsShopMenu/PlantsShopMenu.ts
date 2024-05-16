import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import EventBus from '@emitter/EventBus';

import { styles } from './styles';
import '@components/menus/PlantsShopMenu';

import { timeReadableConverter } from '@helpers/time-coverter';

import { _EVENTS } from '@constants/events';

import type { IPlantListItem, IPlantsList } from '@interfaces/IPlantListItem';

@customElement('plants-menu')
export default class PlantsShopMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  isshown: boolean;

  @property({ type: String })
  title = 'Seeds Shop';

  @property({ type: String })
  description =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, cupiditate cum minus';

  private list: IPlantsList;

  constructor() {
    super();

    this.isshown = true;
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
  }

  handleSeedPick(item: IPlantListItem) {
    EventBus.emit(_EVENTS.picked_plant_update, item);
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
    >
      <ul class="list">
      ${repeat(this.list.simple, (item) => {
        const growingString = timeReadableConverter(item.growTime);

        return html`
          <li @click=${() => this.handleSeedPick(item)} class="item">
            <img
              class="image"
              src="./assets/plants/icons/${item.texture.toLowerCase()}.png"
              alt="icon"
            />
            <div class="content">
              <h2 class="title">${item.title}</h2>
              <p class="grow-time">Growing time: ${growingString}</p>

              <div class="stats">
                <p class="stats-value">
                  <img
                    class="stats-icon"
                    src="./assets/utils/money.png"
                    alt="coin"
                  />
                  ${item.gamePrice}
                </p>

                <p class="stats-value">
                  <img
                    class="stats-icon"
                    src="./assets/utils/token.png"
                    alt="token"
                  />
                  ${item.tokenPrice}
                </p>
              </div>
            </div>
          </li>
        `;
      })}
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
