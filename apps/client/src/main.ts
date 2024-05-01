import axios from 'axios';

import { Game, Types } from 'phaser';

import { Boot } from '@scenes/Boot';
import { Game as MainGame } from '@scenes/Game';
import { GameOver } from '@scenes/GameOver';
import { MainMenu } from '@scenes/MainMenu';
import { Preloader } from '@scenes/Preloader';

import '@helpers/ton-connect-ui';

axios.defaults.baseURL = 'http://192.168.2.110:4000/api';
// axios.defaults.baseURL = 'http://172.20.0.1:4000/api'
// axios.defaults.baseURL = 'https://newtimesgarden.online/api';

window?.Telegram?.WebApp?.expand();

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
