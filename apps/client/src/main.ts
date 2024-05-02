import axios from 'axios';

import { Game, Types } from 'phaser';

import { Boot } from '@scenes/Boot';
import { Game as MainGame } from '@scenes/Game';
import { GameOver } from '@scenes/GameOver';
import { MainMenu } from '@scenes/MainMenu';
import { Preloader } from '@scenes/Preloader';

import '@helpers/ton-connect-ui';

axios.defaults.baseURL = process.env.BACKEND_LINK;

window?.Telegram?.WebApp?.expand();
window?.Telegram?.WebApp?.enableClosingConfirmation();

const overflow = 0;
document.body.style.overflowY = 'hidden';
document.body.style.marginTop = `${overflow}px`;
document.body.style.height = window.innerHeight + overflow + 'px';
document.body.style.paddingBottom = `${overflow}px`;
window.scrollTo(0, overflow);

const scrollableEl = document.getElementById('app');
let ts: number | undefined;
const onTouchStart = (e: TouchEvent) => {
  ts = e.touches[0].clientY;
};
const onTouchMove = (e: TouchEvent) => {
  if (scrollableEl) {
    const scroll = scrollableEl.scrollTop;
    const te = e.changedTouches[0].clientY;
    if (scroll <= 0 && ts! < te) {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }
};
document.documentElement.addEventListener('touchstart', onTouchStart, {
  passive: false
});
document.documentElement.addEventListener('touchmove', onTouchMove, {
  passive: false
});

const screenSize = {
  x: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  y: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
};

const config: Types.Core.GameConfig = {
  parent: 'game-container',
  type: Phaser.CANVAS,
  width: screenSize.x,
  height: screenSize.y,
  scale: {
    width: '100%',
    height: '100%',
    mode: Phaser.Scale.MAX_ZOOM,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },

  physics: {
    arcade: {
      debug: true
    }
  },

  title: 'New Times Garden',
  url: 'https://newtimesgarden.online/',
  version: '1.0',
  banner: false,
  backgroundColor: '#2d2d2d',

  scene: [Boot, Preloader, MainMenu, MainGame, GameOver]
};

export default new Game(config);
