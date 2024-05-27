import { styles } from './Tutorial.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { _EVENTS } from '@constants/events';

@customElement('tutorial-modal')
export default class PaperModal extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  isshown: boolean;

  constructor() {
    super();

    this.isshown = false;
  }

  connectedCallback(): void {
    super.connectedCallback();

    EventBus.on(_EVENTS.tutorial_modal_open, () => {
      this.isshown = true;
    });
  }

  handleClose() {
    window.localStorage.setItem('skip-tutorial', JSON.stringify(true));
    this.isshown = false;
    this.requestUpdate();
  }

  render() {
    return html`<div class="container ${this.isshown ? '' : 'hidden'}">
      <div class="wrapper">
        <div class="foreground">
          <img class="frame" src="./assets/utils/frame.png" alt="frame" />
        </div>
        <div class="foreground bot">
          <img class="frame" src="./assets/utils/frame-bottom.png" alt="bottom" />
        </div>

        <div class="content">
          <div class="header">News Garden</div>
          <div class="step">
            <div class="arrow"></div>
            <img class="image" src="./assets/tutorial/step-1.png" alt="step-1" />
            <div class="description">
              Choose a plant from Seeds menu, which you want to grow. Every plant has
              a price and income
            </div>
          </div>
          <div class="step reverse">
            <div class="arrow"></div>
            <img class="image" src="./assets/tutorial/step-2.png" alt="step-2" />
            <div class="description">
              Place seeds in garden cells and wait growing phase. Then you can
              harvest crops
            </div>
          </div>
          <div class="step">
            <div class="arrow"></div>
            <img class="image" src="./assets/tutorial/step-3.png" alt="step-1" />
            <div class="description">
              Check your house for daily quests and achievements. Inside you can
              track progress
            </div>
          </div>

          <img
            @click=${this.handleClose}
            class="go-button"
            src="./assets/tutorial/go-button.png"
            alt="close"
          />
        </div>
      </div>
    </div>`;
  }
}
