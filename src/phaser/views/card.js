export class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, position, cardScale, cardId) {
    super(scene, position.x, position.y, `card-${cardId}`);
    this.setScale(cardScale);
    scene.add.existing(this);
  }
}