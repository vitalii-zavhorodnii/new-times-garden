import axios from 'axios';

import { Game, Types } from 'phaser';
import { register } from 'swiper/element/bundle';

import { Boot } from '@scenes/Boot';
import { Game as MainGame } from '@scenes/Game';
import { GameOver } from '@scenes/GameOver';
import { HouseScene } from '@scenes/HouseScene';
import { MainMenu } from '@scenes/MainMenu';
import { Preloader } from '@scenes/Preloader';

import GameInterface from '@components/GameInterface';

import '@helpers/ton-connect-ui';

axios.defaults.baseURL = process.env.BACKEND_LINK;

const WebApp = window?.Telegram?.WebApp;

if (!WebApp) {
  console.error('No Web App!');
}

WebApp.expand();
WebApp.disableClosingConfirmation();
WebApp.ready();

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
    width: '200%',
    height: '100%',
    mode: Phaser.Scale.NONE,
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

  scene: [Boot, Preloader, MainGame, HouseScene, MainMenu, , GameOver]
};

{
  const overflow = 1;

  document.body.style.marginTop = `${overflow}px`;
  document.body.style.height = window.innerHeight + overflow + 'px';
  document.body.style.paddingBottom = `${overflow}px`;

  let ts: number | undefined;
  const onTouchStart = (e: TouchEvent) => {
    ts = e.touches[0].clientY;
  };
  const scrollableEl = document.getElementById('app');
  const onTouchMove = (e: TouchEvent) => {
    if (scrollableEl) {
      const scroll = scrollableEl.scrollTop;
      const te = e.changedTouches[0].clientY;
      if (scroll <= 0 && ts! < te) {
        window.scrollTo(0, overflow);
      }
    } else {
      window.scrollTo(0, overflow);
    }
  };
  document.documentElement.addEventListener('touchstart', onTouchStart, {
    passive: false
  });
  document.documentElement.addEventListener('touchmove', onTouchMove, {
    passive: false
  });
}

register();
new GameInterface();
export default new Game(config);
