import { styles } from './PaperModal.styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { _EVENTS } from '@constants/events';

@customElement('paper-modal')
export default class PaperModal extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true })
  isshown: boolean;

  @property({ type: String, attribute: true })
  title: string;

  @property({ type: String, attribute: true })
  description: string;

  @property({ type: String })
  balanceCoins: number;

  @property({ type: String })
  balanceTokens: number;

  constructor() {
    super();
  }

  handleClose() {
    EventBus.emit(_EVENTS.plant_menu_close);
    EventBus.emit(_EVENTS.shop_menu_close);
  }

  render() {
    return html`<div class="container ${this.isshown ? '' : 'hidden'}">
      <div class="foreground">
        <img
          @click=${this.handleClose}
          class="btn-close"
          src="./assets/utils/cross.png"
          alt="close"
        />
        <img class="frame" src="./assets/utils/frame.png" alt="frame" />
      </div>

      <div class="information">
        <div class="header">${this.title}</div>
        <div class="description">${this.description}</div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>`;
  }
}
