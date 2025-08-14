import Phaser from 'phaser'
import {baseConfig} from "@phaser/data/data.ts";
import {Game} from "@phaser/scene/game.ts";
import type {GameOptions} from "@phaser/types.ts";


export function initGame(options: GameOptions) {
  const {parent, width, height} = options;

  const config = {
    ...baseConfig,
    parent: parent,
    scene: Game,
    scale: {
      parent,
      width: width,
      height: height,
      mode: Phaser.Scale.FIT ,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    resolution: window.devicePixelRatio || 1,
  }
  const game = new Phaser.Game(config);

  return game;
}