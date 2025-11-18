import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';
import { Deck } from './deck';
import { GameState } from './game-state';
import { CardStates } from './card-states';
import { ChipsService } from './chips-service';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private deckService = inject(Deck);
  cards = this.deckService.cards;

  private gameState = inject(GameState);
  private cardStates = inject(CardStates);
  private chipsService = inject(ChipsService);
  private player = inject(Player);

  initGame() {
    this.gameState.initGame();
  }

  startGame() {
    if (this.chipsService.selectedChipsSum() === 0) return;
    if (this.player.money() <= 0) return;

    this.gameState.startGame();
    this.player.subtract(this.chipsService.selectedChipsSum());

    const cards = this.deckService.drawFromShoe(4);

    this.cardStates.setInitialCards(cards);
    this.checkInitialCards([cards[0], cards[2]], [cards[1], cards[3]]);
  }

  private checkInitialCards(playerCards: Card[], dealerCards: Card[]) {
    const dealerSum = dealerCards.reduce((prev, next) => prev + next.value, 0);

    if (dealerSum === 21) {
      console.log('You lose!');
      return;
    }

    const playerSum = playerCards.reduce((prev, next) => prev + next.value, 0);

    if (playerSum === 21) {
      console.log('BlackJack! You Win!');
      this.player.add(this.chipsService.selectedChipsSum() * 1.5);
      return;
    }
  }

  playerHit() {
    const card = this.deckService.drawFromShoe(1);

    if (card.length < 1) return;

    this.cardStates.addPlayerCard(card[0]);

    const playerSum = this.cardStates.playerSum();

    if (playerSum > 21) {
      console.log('YOU LOSE! MORE THAN 21');
      this.gameState.endGame();
    }
  }

  // playerHit() {
  //   const cards = this.drawFromShoe(4);

  //   if (cards.length < 1) return;

  //   this._playerCards.update((val) => [...val, cards[0]]);
  // }

  // private dealerHit() {
  //   while (
  //     (this.dealerSum() < this.playerSum() || this.dealerSum() <= 16) &&
  //     this.dealerSum() <= 21
  //   ) {
  //     const cards = this.drawFromShoe(4);

  //     if (cards.length < 1) return;

  //     this._dealerCards.update((val) => [...val, cards[0]]);
  //   }
  // }

  // stand() {
  //   if (this.dealerSum() <= 16) {
  //     this.dealerHit();
  //   }
  // }

  // resetValues(): void {
  //   this._playerCards.set([]);
  //   this._dealerCards.set([]);
  //   this._canSplit.set(false);
  // }
}

/*
Width: 150px - 200px

Height: 210px - 280px (maintaining a 7:10 aspect ratio, common for playing cards)

Example: 175px (width) x 245px (height)
*/
