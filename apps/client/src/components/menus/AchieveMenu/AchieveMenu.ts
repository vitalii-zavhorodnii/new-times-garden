import { markup } from './markup';

import { timeReadableConverter } from '@helpers/time-coverter';

import type { IAchievementLog } from '@interfaces/IUserData';

export default class AchieveMenu {
  public isOpen: boolean;
  public list: IAchievementLog;
  public achieveLog: IAchievementLog;

  public callback: Function;

  private container: HTMLElement;
  private content: HTMLElement;

  constructor(achieveLog: IAchievementLog, callback: Function) {
    this.isOpen = false;
    this.callback = callback;

    this.container = document.getElementById('achieve-menu');
    this.content = document.getElementById('achieve-menu-content');

    this.achieveLog = achieveLog;
    this.createMarkup();
  }

  public open() {
    this.isOpen = true;
    this.container.classList.remove('hidden');
  }

  public close() {
    this.isOpen = false;
    this.container.classList.add('hidden');
  }

  public toggle() {
    if (!this.isOpen) {
      this.open();
    } else if (this.isOpen) {
      this.close();
    }
  }

  private createMarkup() {
    // const list = this.achieveLog.map((plant, index) => {
    //   const itemHTML = document.createElement('li');
    //   itemHTML.classList.add('plants-menu__item');
    //   itemHTML.setAttribute('index', String(index));
    //   const growingString = timeReadableConverter(plant.growTime);
    //   const markupHTML: string = markup(
    //     plant.title,
    //     plant.gamePrice,
    //     plant.tokenPrice,
    //     plant.coinsIncome,
    //     plant.tokensIncome,
    //     plant.xpIncome,
    //     growingString
    //   );
    //   itemHTML.innerHTML = markupHTML;
    //   itemHTML.addEventListener('click', () => {
    //     this.callback(plant);
    //   });
    //   return itemHTML;
    // });
    // const listHTML = document.createElement('ul');
    // list.forEach((item) => {
    //   listHTML.appendChild(item);
    // });
    // this.content.appendChild(listHTML);
  }
}
