import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';
import { Deck } from './deck';
import { GameState } from './game-state';
import { CardStates } from './card-states';
import { Player } from './player';
import { GameResult } from '../../shared/models/GameResult';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private deckService = inject(Deck);
  cards = this.deckService.cards;

  private gameState = inject(GameState);
  private cardStates = inject(CardStates);
  private player = inject(Player);

  initGame() {
    this.gameState.initGame();
  }

  startGame() {
    if (this.player.money() < 0 || this.player.bid() <= 0) return;

    this.gameState.startGame();

    const cards = this.deckService.drawFromShoe(4);

    const initialResult = this.cardStates.setInitialCards(cards);

    if (initialResult === GameResult.BlackJack) {
      console.log('You win!');
      this.player.blackJack();
    } else if (initialResult === GameResult.Lose) {
      console.log('You Lose! BlackJack');
    }
  }

  playerHit() {
    const card = this.deckService.drawFromShoe(1);

    if (card.length < 1) return;

    const moveResult = this.cardStates.addPlayerCard(card[0]);

    if (moveResult === GameResult.Lose) {
      console.log('YOU LOSE! MORE THAN 21');
      return;
    }
  }

  private dealerHit(): GameResult | null {
    const playerSum = this.cardStates.playerSum;
    const dealerSum = this.cardStates.dealerSum;

    while ((dealerSum() < playerSum() || dealerSum() <= 16) && dealerSum() <= 21) {
      const card = this.deckService.drawFromShoe(1);

      if (card.length < 1) return null;

      const moveResult = this.cardStates.addDealerCard(card[0]);
      if (moveResult === GameResult.Win) {
        console.log('You Win!');
        return GameResult.Win;
      }
    }

    console.log('You Lose!');
    return GameResult.Lose;
  }

  stand(): void {
    const playerSum = this.cardStates.playerSum;
    const dealerSum = this.cardStates.dealerSum;

    if (dealerSum() <= 16) {
      const moveResult = this.dealerHit();

      if (moveResult === GameResult.Win) {
        this.player.win();
        return;
      }
    }

    console.log(playerSum(), dealerSum());

    if (playerSum() > dealerSum()) {
      console.log('You Win!');
      this.player.win();
    } else if (playerSum() < dealerSum()) {
      console.log('You Lose!');
    } else {
      console.log('Push');
      this.player.push();
    }
  }

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
