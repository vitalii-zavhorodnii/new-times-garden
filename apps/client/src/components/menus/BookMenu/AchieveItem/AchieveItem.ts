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
      <div
        @click=${() => this.handleAchievementClick(this.item)}
        class="achievement"
      >
        <div class="image-holder">
          <img class="frame" src="./assets/book/frame-2.png" alt="icon" />
          <img
            class="image"
            src="./assets/plants/icons/${this.item.achievement.icon}"
            alt="icon"
          />
        </div>

        <div class="about">
          <div class="title">${this.item.achievement.title}</div>
          <!-- <div class="description">${this.item.achievement
            .description}</div> -->
          ${this.renderProgress()} ${this.renderRewards()}
        </div>
      </div>
    `;
  }

  renderProgress() {
    const currentGoal = this.item.achievement.steps[this.item.onStep];

    return html`
      <div class="progress">Harvested: ${this.item.progress} / ${currentGoal}</div>
    `;
  }

  renderRewards() {
    const rewardCoins = this.item.achievement.coinReward[this.item.onStep];
    const rewardTokens = this.item.achievement.tokenReward[this.item.onStep];
    const rewardXp = this.item.achievement.xpReward[this.item.onStep];

    return html`
      <div class="rewards">
        <div class="value ${rewardCoins ? '' : 'hidden'}">
          <img class="icon" src="./assets/utils/money.png" alt="coin" />
          ${rewardCoins}
        </div>

        <div class="value ${rewardTokens ? '' : 'hidden'}">
          <img class="icon" src="./assets/utils/token.png" alt="token" />
          ${rewardTokens}
        </div>

        <div class="value ${rewardXp ? '' : 'hidden'}">
          <img class="icon" src="./assets/utils/experience.png" alt="token" />
          ${rewardXp}
        </div>
      </div>
    `;
  }
}
