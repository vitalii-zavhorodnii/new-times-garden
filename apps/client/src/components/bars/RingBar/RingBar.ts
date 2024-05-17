import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { styles } from './RingBar.styles';

import { _EVENTS } from '@constants/events';

@customElement('ring-bar')
export default class RingBar extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true, reflect: true })
  isshown: boolean;

  @property({ type: Boolean, attribute: true, reflect: true })
  active_escape: boolean;

  constructor() {
    super();

    this.isshown = false;
    this.active_escape = false;

    EventBus.on(_EVENTS.ring_show, () => {
      this.isshown = true;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.ring_hide, () => {
      this.isshown = false;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.ring_set_menu, () => {
      this.active_escape = false;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.ring_set_escape, () => {
      this.active_escape = true;
      this.requestUpdate();
    });
  }

  _handleMenuClick(): void {
    EventBus.emit(_EVENTS.plant_menu_open);
  }

  _handleEscClick(): void {
    EventBus.emit(_EVENTS.esc_click);
    EventBus.emit(_EVENTS.picked_plant_clear)
    this.active_escape = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <div
        class="container ${this.isshown ? '' : 'hidden'} ${this.active_escape
          ? 'rotated'
          : ''}"
      >
        <div class="ring">
          <!-- background -->
          <div class="background">
            <img class="background-image" src="./assets/menu/ring.png" alt="ring" />
          </div>
          <!-- main button and escape -->
          <div class="btn-group">
            <div @click=${this._handleMenuClick} class="btn">
              <img
                class="btn-icon"
                src="./assets/menu/plant-shop.png"
                alt="plants"
              />
            </div>
          </div>

          <div class="btn-group rotated">
            <div @click=${this._handleEscClick} class="btn">
              <img class="btn-icon" src="./assets/menu/cancel.png" alt="escape" />
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
