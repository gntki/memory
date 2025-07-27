export class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, cardScale, cardId) {
    super(scene, 0, 0, `card-back`);
    this.setScale(cardScale);
    this.cardId = cardId;
    this.opened = false;
    scene.add.existing(this);
    this.setInteractive();
  }

  openCard() {
    this.opened = true;
    this.setTexture(`card-${this.cardId}`);
  }

  closeCard() {
    this.opened = false;
    this.setTexture(`card-back`);
  }

}

