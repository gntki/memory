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
    },
  }
  const game = new Phaser.Game(config);

  return game;
}