// import '../helpers/ton-connect-ui';
import { Game, Types } from 'phaser';

import { Boot } from '@scenes/Boot';
import { Game as MainGame } from '@scenes/Game';
import { GameOver } from '@scenes/GameOver';
// import { HouseScene } from '@scenes/HouseScene';
import { MainMenu } from '@scenes/MainMenu';
import { Preloader } from '@scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
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

  scene: [Boot, Preloader, MainGame, MainMenu, GameOver]
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
