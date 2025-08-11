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
  private timeoutText: Phaser.GameObjects.Text = '';
  private timeValue = 60;
  private sounds;

  constructor() {
    super({key: 'Game'});
  }

  preload() {
    //images
    this.load.image('background', 'images/background.jpg');
    this.load.image('card-back', 'images/back.png');
    this.load.image('card-1', 'images/front-1.png');
    this.load.image('card-2', 'images/front-2.png');
    this.load.image('card-3', 'images/front-3.png');
    this.load.image('card-4', 'images/front-4.png');
    this.load.image('card-5', 'images/front-5.png');

    //fonts
    this.load.font('CustomFont', 'fonts/MasqueradeToyStoreStuff-Regular.woff2');

    //audio
    this.load.audio('theme', 'audio/theme.mp3')
    this.load.audio('card_open', 'audio/card.mp3')
    this.load.audio('success', 'audio/success.mp3')
    this.load.audio('complete', 'audio/complete.mp3')
    this.load.audio('timer_end', 'audio/timer_end.mp3')
  }

  create() {
    this.createTimer();
    this.createBackground();
    this.createText();
    this.createCards();

    this.startGame();
    this.createSound();
  }

  startGame() {
    this.openedCard = null;
    this.openedPairCount = 0;
    this.timeValue = 60;
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

  createSound() {
    this.sounds = {
      theme: this.sound.add('theme'),
      card_open: this.sound.add('card_open'),
      success: this.sound.add('success'),
      complete: this.sound.add('complete'),
      timer_end: this.sound.add('timer_end')
    }

    this.sounds.theme.play({volume: .1, loop: true});
  }

  createText() {
    this.timeoutText = this.add.text(this.scale.width / 2 - 60, 30, ``, {
      fontFamily: "CustomFont",
      fontSize: '30rem',
      fill: "#000000"
    })
  }

  createTimer() {
    this.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick,
      callbackScope: this,
      loop: true
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
        this.sounds.success.play();
        ++this.openedPairCount;
      } else {
        this.openedCard.closeCard();
        this.openedCard = card;
      }
    } else {
      this.openedCard = card;
    }

    this.sounds.card_open.play();
    card.openCard();

    if(this.openedPairCount === this.cards.length/2) {
      this.startGame();
      this.sounds.complete.play();
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

  onTimerTick() {
    this.timeoutText.setText(`Time: ${this.timeValue}`);

    if(this.timeValue <= 0) {
      this.sounds.timer_end.play();
      this.startGame();
    } else {
      --this.timeValue;
    }
  }


}