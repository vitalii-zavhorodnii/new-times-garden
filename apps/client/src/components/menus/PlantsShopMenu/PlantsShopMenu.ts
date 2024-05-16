import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import EventBus from '@emitter/EventBus';

import { styles } from './styles';
import '@components/menus/PlantsShopMenu';

import { _EVENTS } from '@constants/events';

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

  constructor() {
    super();

    this.isshown = true;

    EventBus.on(_EVENTS.plant_menu_open, () => {
      this.isshown = true;
      this.requestUpdate();
    });
    EventBus.on(_EVENTS.plant_menu_close, () => {
      this.isshown = false;
      this.requestUpdate();
    });
  }

  _handleClick(e: Event) {
    console.log('handle', e);
    // EventBus.emit(_EVENTS.plant_menu_close);
  }

  render() {
    return html`<paper-modal
      title=${this.title}
      description=${this.description}
      ?isshown=${this.isshown}
    >
      <div class="container">Hello shop</div>
    </paper-modal> `;
  }
}
