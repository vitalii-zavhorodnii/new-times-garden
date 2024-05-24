import { styles } from './AchieveItem.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { _EVENTS } from '@constants/events';

import type { IUserAchievement } from '@interfaces/IUserData';

@customElement('achievement-item')
export default class BookMenu extends LitElement {
  static styles = styles;

  @property({ attribute: true })
  item: IUserAchievement;

  constructor() {
    super();
  }

  handleAchievementClick(achieve) {
    console.log({ achieve });
  }

  render() {
    return html`
      <div @click=${() => this.handleAchievementClick(this.item)} class="plant-item">
        <img
          class="image"
          src="./assets/plants/icons/${this.item.achievement.icon}"
          alt="icon"
        />

        <div class="about">
          <div class="title">${this.item.achievement.title}</div>
          <div class="description">${this.item.achievement.description}</div>
          <div class="progress">${this.item.progress}</div>
          <div class="stats">
            <div
              class="value 
                    ${this.item.achievement.coinReward ? '' : 'none'}"
            >
              <img class="icon" src="./assets/utils/money.png" alt="coin" />
              ${this.item.achievement.coinReward}
            </div>

            <div
              class="value 
                    ${this.item.achievement.tokenReward ? '' : 'none'}"
            >
              <img class="icon" src="./assets/utils/token.png" alt="token" />
              ${this.item.achievement.tokenReward}
            </div>

            <div
              class="value 
                    ${this.item.achievement.xpReward ? '' : 'none'}"
            >
              <img class="icon" src="./assets/utils/experience.png" alt="token" />
              ${this.item.achievement.xpReward}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
