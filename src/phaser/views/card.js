export class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, position, cardScale) {
    super(scene, position.x, position.y, 'card');
    this.setScale(cardScale);
    scene.add.existing(this);
  }
}