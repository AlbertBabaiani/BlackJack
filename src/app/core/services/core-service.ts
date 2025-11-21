import { computed, inject, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';
import { Deck } from './deck';
import { GameState } from './game-state';
import { CardStates } from './card-states';
import { Player } from './player';
import { GameResult } from '../../shared/models/GameResult';
import { GameMessageService } from './game-message-service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private deckService = inject(Deck);
  cards = this.deckService.cards;

  private gameState = inject(GameState);
  private cardStates = inject(CardStates);
  private player = inject(Player);
  private message = inject(GameMessageService);

  private controlsBlocked = signal<boolean>(false);

  private gameTimeOut = 3000;

  initGame() {
    this.gameState.initGame();
  }

  startGame() {
    if (this.controlsBlocked()) return;
    if (this.player.money() < 0 || this.player.bid() <= 0) return;

    this.gameState.startGame();

    const cards = this.deckService.drawFromShoe(4);

    const initialResult = this.cardStates.setInitialCards(cards);
    // const initialResult = this.cardStates.setInitialCards([
    //   new Card('Hearts', '2', 2),
    //   new Card('Hearts', 'A', 11),
    //   new Card('Hearts', 'A', 11),
    //   new Card('Hearts', 'A', 11),
    // ]);

    if (initialResult === GameResult.BlackJack) {
      this.endGame(GameResult.BlackJack);
    } else if (initialResult === GameResult.Lose) {
      this.endGame(GameResult.Lose);
    }
  }

  playerHit() {
    if (this.controlsBlocked()) return;
    if (this.cardStates.playerSum() >= 21) this.endGame(GameResult.Lose);

    const card = this.deckService.drawFromShoe(1);

    if (card.length < 1) return;

    const moveResult = this.cardStates.addPlayerCard(card[0]);
    // const moveResult = this.cardStates.addPlayerCard(new Card('Diamonds', 'A', 11));

    if (moveResult === GameResult.Lose) {
      this.endGame(moveResult);
    }

    if (this.cardStates.playerSum() === 21) {
      this.stand();
    }
  }

  double(): void {
    if (this.controlsBlocked()) return;
    this.controlsBlocked.set(true);

    const response = this.player.doubleBid();
    if (!response) return;

    const card = this.deckService.drawFromShoe(1);
    if (card.length < 1) return;

    const moveResult = this.cardStates.double(card[0]);
    // const moveResult = this.cardStates.double(new Card('Clubs', '6', 6));

    this.endGame(moveResult, true);
  }

  private dealerHit(): GameResult | null {
    const playerSum = this.cardStates.playerSum;
    const dealerSum = this.cardStates.dealerSum;

    // while ((dealerSum() < playerSum() || dealerSum() <= 16) && dealerSum() <= 21) {
    while ((dealerSum() <= playerSum() || dealerSum() <= 16) && dealerSum() < 21) {
      const card = this.deckService.drawFromShoe(1);

      if (card.length < 1) return null;

      console.log('Dealer sum: ', dealerSum());

      const moveResult = this.cardStates.addDealerCard(card[0]);

      if (moveResult === GameResult.Win) {
        return GameResult.Win;
      }
    }

    return GameResult.Lose;
  }

  stand(): void {
    if (this.controlsBlocked()) return;
    this.controlsBlocked.set(true);
    const playerSum = this.cardStates.playerSum;
    const dealerSum = this.cardStates.dealerSum;

    this.controlsBlocked.set(true);

    if (dealerSum() <= 16) {
      const moveResult = this.dealerHit();

      if (moveResult === GameResult.Win) {
        this.endGame(GameResult.Win);
        return;
      }
    }

    if (playerSum() > dealerSum()) {
      this.endGame(GameResult.Win);
    } else if (playerSum() < dealerSum()) {
      this.endGame(GameResult.Lose);
    } else {
      this.endGame(GameResult.Push);
    }
  }

  private endGame(result: GameResult, doubled?: boolean): void {
    this.controlsBlocked.set(true);

    if (result === GameResult.Lose) {
      this.message.setMessage(result, this.player.bid());
    } else if (result === GameResult.Push) {
      this.player.push();
      this.message.setMessage(result, this.player.bid());
    } else if (result === GameResult.BlackJack) {
      this.message.setMessage(result, this.player.bid() * 1.5);
      this.player.blackJack();
    } else if (result === GameResult.Win) {
      this.player.win();
      this.message.setMessage(result, this.player.bid() * 2);
    }

    setTimeout(() => {
      this.message.clearMessage();
      this.player.resetBid();
      this.cardStates.resetCards();
      this.controlsBlocked.set(false);

      if (doubled) this.player.removeDoubled();
      this.gameState.initGame();
    }, this.gameTimeOut);
  }
}
