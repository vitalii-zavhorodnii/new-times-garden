import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { styles } from './styles';
import '@components/menus/PlantsShopMenu';

import { _EVENTS } from '@constants/events';

@customElement('plants-menu')
export default class PlantsShopMenu extends LitElement {
  static styles = styles;

  // @property({ type: Boolean, attribute: true, reflect: true })
  // isshown: boolean;

  // @property({ type: Boolean, attribute: true, reflect: true })
  // active_escape: boolean;

  constructor() {
    super();

    // this.isshown = false;
    // this.active_escape = false;

    // EventBus.on(_EVENTS.ring_show, () => {
    //   this.isshown = true;
    //   this.requestUpdate();
    // });
    // EventBus.on(_EVENTS.ring_hide, () => {
    //   this.isshown = false;
    //   this.requestUpdate();
    // });
    // EventBus.on(_EVENTS.ring_set_menu, () => {
    //   this.active_escape = false;
    //   this.requestUpdate();
    // });
    // EventBus.on(_EVENTS.ring_set_escape, () => {
    //   this.active_escape = true;
    //   this.requestUpdate();
    // });
  }

  render() {
    return html`<paper-modal>
      <div class="container">
        Hello shop
      </div>
    </paper-modal> `;
  }
}
