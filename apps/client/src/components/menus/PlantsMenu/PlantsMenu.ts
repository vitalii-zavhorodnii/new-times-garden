import { markup } from './markup';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import EventBus from '@emitter/EventBus';

import { timeReadableConverter } from '@helpers/time-coverter';

import { _EVENTS } from '@constants/events';

import type { IPlantListItem, IPlantsList } from '@interfaces/IPlantListItem';

export default class PlantsMenu {
  public isOpen: boolean;
  public list: IPlantsList;
  public callback: Function;

  private container: HTMLElement;
  private content: HTMLElement;

  private swiper: Swiper;
  private categories: {
    vegetables: HTMLElement | null;
    fruits: HTMLElement | null;
    berries: HTMLElement | null;
    flowers: HTMLElement | null;
    herbs: HTMLElement | null;
  };

  constructor(plants: IPlantsList, callback: Function) {
    this.isOpen = false;
    this.callback = callback;

    this.container = document.getElementById('plants-menu');
    this.content = document.getElementById('plants-menu-content');

    this.categories = {
      vegetables: this.createMarkupCategory(plants.vegetables),
      fruits: this.createMarkupCategory(plants.fruits),
      berries: this.createMarkupCategory(plants.berries),
      herbs: this.createMarkupCategory(plants.herbs),
      flowers: this.createMarkupCategory(plants.flowers)
    };

    this.createMarkup();

    EventBus.on(_EVENTS.plant_menu_open, () => {
      this.isOpen = true;
      this.container.classList.remove('hidden');
    });

    EventBus.on(_EVENTS.plant_menu_close, () => {
      this.isOpen = false;
      this.container.classList.add('hidden');
    });
  }

  private createMarkupCategory(plants: IPlantListItem[]) {
    const itemsHTML = plants.map((plant, index) => {
      const itemHTML = document.createElement('li');
      itemHTML.classList.add('plants-menu__item');
      itemHTML.setAttribute('index', String(index));

      const growingString = timeReadableConverter(plant.growTime);

      const markupHTML: string = markup(
        plant.title,
        plant.gamePrice,
        plant.tokenPrice,
        plant.coinsIncome,
        plant.tokensIncome,
        plant.xpIncome,
        growingString
      );

      itemHTML.innerHTML = markupHTML;

      itemHTML.addEventListener('click', () => {
        EventBus.emit(_EVENTS.ring_set_escape);
        EventBus.emit(_EVENTS.picked_plant_update, plant);
        EventBus.emit(_EVENTS.plant_menu_close);
      });

      return itemHTML;
    });

    const listHTML = document.createElement('ul');
    listHTML.classList.add('swiper-slide');

    itemsHTML.forEach((item) => {
      listHTML.appendChild(item);
    });

    if (!itemsHTML.length) {
      return null;
    }

    return listHTML;
  }

  private createMarkup() {
    const swiperHTML = document.createElement('div');
    swiperHTML.classList.add('swiper');
    swiperHTML.setAttribute('id', 'swiper');

    const wrapperHTML = document.createElement('div');
    wrapperHTML.classList.add('swiper-wrapper');

    const paginationHTML = document.createElement('ul');
    paginationHTML.classList.add('swiper-extra-pagination');
    paginationHTML.setAttribute('id', 'swiper-pagination');

    let index = 0;
    for (const category in this.categories) {
      if (this.categories[category] !== null) {
        const paginationBtnHTML = document.createElement('li');
        paginationBtnHTML.classList.add('swiper-extra-pagination__item');
        paginationBtnHTML.innerHTML = category;

        const goTo = index;
        paginationBtnHTML.addEventListener('click', () => {
          this.handleSlideChange(goTo);
        });

        paginationHTML.appendChild(paginationBtnHTML);
        wrapperHTML.appendChild(this.categories[category]);

        index++;
      }
    }

    swiperHTML.appendChild(paginationHTML);
    swiperHTML.appendChild(wrapperHTML);

    this.content.appendChild(swiperHTML);

    const container = document.getElementById('swiper');
    this.swiper = new Swiper(container, {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      modules: [Navigation],
      pagination: {
        el: '#swiper-pagination'
      },
      navigation: {
        nextEl: '#swiper-button-next',
        prevEl: '#swiper-button-prev'
      }
    });
  }

  public handleSlideChange(slide: number) {
    this.swiper.slideTo(slide);
  }
}
