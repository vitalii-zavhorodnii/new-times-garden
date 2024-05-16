import axios from 'axios';

import { Game, Types } from 'phaser';
import 'swiper/css';

import { Boot } from '@scenes/Boot';
import { Game as MainGame } from '@scenes/Game';
import { GameOver } from '@scenes/GameOver';
import { HouseScene } from '@scenes/HouseScene';
import { MainMenu } from '@scenes/MainMenu';
import { Preloader } from '@scenes/Preloader';

import GameInterface from '@components/GameInterface';

import '@helpers/ton-connect-ui';

// axios.defaults.baseURL = 'http://192.168.2.49:4000/api';
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

new GameInterface();
export default new Game(config);
