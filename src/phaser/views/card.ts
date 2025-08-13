import type {MoveParams} from "@phaser/scene/types.ts";

export class Card extends Phaser.GameObjects.Sprite {
  cardId: number;
  cardScale: number;
  moveParams!: MoveParams;
  opened: boolean;

  constructor(scene: Phaser.Scene, cardScale: number, cardId: number) {
    super(scene, 0, 0, `card-back`);

    this.scene = scene;
    this.cardId = cardId;
    this.cardScale = cardScale;
    this.setScale(cardScale);

    scene.add.existing(this);
    this.setInteractive();
    this.opened = false;
  }


  initCard(params: MoveParams) {
    this.moveParams = params;
    this.closeCard();
    this.setPosition(-this.width,-this.height);
    console.log(this, this.moveParams)
  }

  move() {
    this.scene.tweens.add({
      targets: this,
      x: this.moveParams.x,
      y: this.moveParams.y,
      delay: this.moveParams.delay,
      ease: "linear",
      duration: 350,
      onComplete: ()=> {}
    })
  }

  openCard() {
    this.opened = true;
    this.flip(`card-${this.cardId}`)
  }

  closeCard() {
    if(!this.opened) return;
    this.opened = false;
    this.flip(`card-back`)
  }

  flip(texture: string) {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "linear",
      duration: 150,
      onComplete: ()=> this.show(texture)
    })
  }

  show(texture: string) {
    this.setTexture(texture);
    this.scene.tweens.add({
      targets: this,
      scaleX: this.cardScale,
      ease: "linear",
      duration: 150,
    })
  }

}

