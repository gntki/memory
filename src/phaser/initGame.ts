import Phaser from 'phaser'

import {baseConfig} from "phaser/data/data.ts";


export function initGame(options) {
  const {parent, fullScreen = true, width, height} = options;

  const config = {
    ...baseConfig,
    parent: parent,
    scale: {
      parent,
      width: width,
      height: height,
    }
  }
  const game = new Phaser.Game(config);

  return game;
}