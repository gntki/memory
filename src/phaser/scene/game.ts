import Phaser from "phaser"
import {Card} from "@phaser/views/card.js";


export class Game extends Phaser.Scene {
  private cardScale = .5
  private cardOffset = 20
  private cardIds: number[] = [1,2,3,4,5]
  private cards = []

  constructor() {
    super({key: 'Game'})
  }

  preload() {
    this.load.image('background', 'images/background.jpg')
    this.load.image('card-back', 'images/back.png')
    this.load.image('card-1', 'images/front-1.png')
    this.load.image('card-2', 'images/front-2.png')
    this.load.image('card-3', 'images/front-3.png')
    this.load.image('card-4', 'images/front-4.png')
    this.load.image('card-5', 'images/front-5.png')
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
    Phaser.Utils.Array.Shuffle(positions);

    for (let cardId of this.cardIds) {
      for(let i=0; i<2; i++) {
        this.cards.push(new Card(this, positions.pop(), this.cardScale, cardId));
      }
    }
  }

  getPositions() {
    const positions = []

    const rows = 5
    const cols = 2

    const cardTexture = this.textures.get('card-1').getSourceImage()
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