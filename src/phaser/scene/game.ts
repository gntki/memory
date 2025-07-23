import Phaser from "phaser"


export class Game extends Phaser.Scene{
  private cardScale = .4
  private cardOffset = 20

  constructor() {
    super({key: 'Game'})
  }

  preload() {
    this.load.image('background', 'images/background.jpg')
    this.load.image('card', 'images/card.jpg')
    console.log(this)
  }

  create() {
    const w = this.scale.width
    const h = this.scale.height
    const positions = this.getPositions();

    this.add.image(w/2, h/2 , 'background').setDisplaySize(w,h)
    for(let position of positions) {
      this.add.sprite(position.x, position.y , 'card').setScale(this.cardScale)
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

    for(let i=0; i<rows; i++) {
      for(let j=0; j<cols; j++) {
        positions.push({
          x: i * w + offsetX,
          y: j * h + offsetY
        })
      }
    }

    return positions
  }


}