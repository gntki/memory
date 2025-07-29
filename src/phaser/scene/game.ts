import Phaser from "phaser"
import {Card} from "@phaser/views/card.js";
import type {PositionType} from "@phaser/scene/types.ts";


export class Game extends Phaser.Scene {
  private cardsMap = {rows: 5, cols: 2};
  private cardScale = .45;
  private cardOffset = 20;
  private cardIds: number[] = [1,2,3,4,5];
  private cards = [];
  private openedCard  = null;
  private openedPairCount = 0;

  constructor() {
    super({key: 'Game'});
  }

  preload() {
    this.load.image('background', 'images/background.jpg');

    this.load.font('CustomFont', 'fonts/MasqueradeToyStoreStuff-Regular.woff2');

    this.load.image('card-back', 'images/back.png');
    this.load.image('card-1', 'images/front-1.png');
    this.load.image('card-2', 'images/front-2.png');
    this.load.image('card-3', 'images/front-3.png');
    this.load.image('card-4', 'images/front-4.png');
    this.load.image('card-5', 'images/front-5.png');
  }

  create() {
    this.createBackground();
    this.createText();
    this.createCards();

    this.startGame();
  }

  startGame() {
    this.openedCard = null;
    this.openedPairCount = 0;
    this.initCards();
  }

  initCards() {
    const positions = this.getPositions();
    Phaser.Utils.Array.Shuffle(positions);

    this.cards.forEach((card)=> {
      const position: PositionType = positions.pop()!;
      if(!positions) return;
      card.closeCard();
      card.setPosition(position.x,position.y);
    })
  }

  createBackground() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.add.image(w / 2, h / 2, 'background').setDisplaySize(w, h);
  }

  createText() {
    this.add.text(this.scale.width / 2 - 60, 30, "Time: 30", {
      fontFamily: "CustomFont",
      fontSize: '30rem',
      fill: "#000000"
    })
  }

  createCards() {
     for (let cardId of this.cardIds) {
      for(let i=0; i<this.cardsMap.cols; i++) {
        this.cards.push(new Card(this, this.cardScale, cardId));
      }
    }

    this.input.on('gameobjectdown', this.onCardClick, this);
  }

  onCardClick(pointer, card) {
    if(card.opened) return;

    if(this.openedCard) {
      if(this.openedCard.cardId === card.cardId) {
        this.openedCard = null;
        ++this.openedPairCount;
      } else {
        this.openedCard.closeCard();
        this.openedCard = card;
      }
    } else {
      this.openedCard = card;
    }
    card.openCard();

    if(this.openedPairCount === this.cards.length/2) {
      this.startGame();
    }
  }

  getPositions() {
    const positions = [];

    const {rows, cols} = this.cardsMap;

    const cardTexture = this.textures.get('card-1').getSourceImage();
    const w = cardTexture.width * this.cardScale + this.cardOffset;
    const h = cardTexture.height * this.cardScale + this.cardOffset;
    const offsetX = (this.scale.width - w * rows + w) / 2;
    const offsetY = (this.scale.height - h * cols + h) / 2;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        positions.push({
          x: i * w + offsetX,
          y: j * h + offsetY
        })
      }
    }

    return positions;
  }


}