import Phaser from "phaser"


export class Game extends Phaser.Scene{
  constructor() {
    super({key: 'Game'})
  }

  preload() {
    this.load.image('background', 'images/background.jpg')
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height
    this.add.image(w/2, h/2 , 'background').setDisplaySize(w,h)
  }
}