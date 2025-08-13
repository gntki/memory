import type {MoveParams, RestartCallback} from "@phaser/scene/types.ts";

export class Card extends Phaser.GameObjects.Sprite {
  cardId: number;
  cardScale: number;
  moveParams!: MoveParams;
  cardDepth!: number;
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
  }

  move(params: MoveParams) {
    this.scene.tweens.add({
      targets: this,
      x: params.x,
      y: params.y,
      delay: params.delay,
      depth: params.depth,
      ease: "linear",
      duration: 350,
      onComplete: ()=> {
        if(params.callback) {
          params.callback();
        }
      }
    })
  }

  openCard(callback: RestartCallback) {
    this.opened = true;
    this.flip(callback)
  }

  closeCard() {
    if(!this.opened) return;
    this.opened = false;
    this.flip()
  }

  flip(callback?: RestartCallback) {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "linear",
      duration: 150,
      onComplete: ()=> this.show(callback)
    })
  }

  show(callback?: RestartCallback) {
    const texture = this.opened ? `card-${this.cardId}` : 'card-back';
    this.setTexture(texture);
    this.scene.tweens.add({
      targets: this,
      scaleX: this.cardScale,
      ease: "linear",
      duration: 150,
      onComplete: ()=> {
        if(callback) callback();
      }
    })
  }

}

