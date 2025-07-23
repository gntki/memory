import Phaser from "phaser"
import {Card} from "@phaser/views/card.js";


export class Game extends Phaser.Scene {
  private cardScale = .4
  private cardOffset = 20
  private cards = []

  constructor() {
    super({key: 'Game'})
  }

  preload() {
    this.load.image('background', 'images/background.jpg')
    this.load.image('card', 'images/card.jpg')
    console.log(this)
  }

  create() {
    this.createBackground()
    this.createCards()
  }

  createBackground() {
    const w = this.scale.width
    const h = this.scale.height

    this.add.image(w / 2, h / 2, 'background').setDisplaySize(w, h)
  }

  createCards() {
    const positions = this.getPositions();

    for (let position of positions) {
      this.cards.push(new Card(this, position, this.cardScale))
    }
  }

  getPositions() {
    const positions = []

    const rows = 5
    const cols = 2

    const cardTexture = this.textures.get('card').getSourceImage()
    const w = cardTexture.width * this.cardScale + this.cardOffset
    const h = cardTexture.height * this.cardScale + this.cardOffset
    const offsetX = (this.scale.width - w * rows + w) / 2
    const offsetY = (this.scale.height - h * cols + h) / 2

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        positions.push({
          x: i * w + offsetX,
          y: j * h + offsetY
        })
      }
    }

    return positions
  }


}