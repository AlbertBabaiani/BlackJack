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
  private deck = inject(Deck);
  cards = this.deck.cards;

  private gameState = inject(GameState);
  private cardStates = inject(CardStates);
  private player = inject(Player);
  private message = inject(GameMessageService);

  private controlsBlocked = signal<boolean>(false);

  initGame() {
    this.gameState.initGame();
  }

  async startGame() {
    if (this.controlsBlocked() || this.player.bid() <= 0) return;

    this.gameState.startGame();
    this.cardStates.reset();
    this.controlsBlocked.set(false);

    const cards = this.deck.drawFromShoe(4);

    this.cardStates.setInitialCards([cards[0], cards[2]], [cards[1], cards[3]]);

    await this.checkInitialBlackjack();
  }

  private async checkInitialBlackjack() {
    const pScore = this.cardStates.playerScore();
    const dScore = this.cardStates.dealerScore();

    if (pScore === 21) {
      if (dScore === 21) {
        this.endRound(GameResult.Push);
      } else {
        this.endRound(GameResult.BlackJack);
      }
    } else if (dScore === 21) {
      this.cardStates.revealDealer();
      this.endRound(GameResult.Lose);
    }
  }

  playerHit() {
    if (this.controlsBlocked()) return;

    const [card] = this.deck.drawFromShoe(1);
    this.cardStates.addPlayerCard(card);

    if (this.cardStates.playerScore() > 21) {
      this.endRound(GameResult.Lose);
    }

    // if (this.cardStates.playerSum() === 21) {
    //   this.stand();
    // }
  }

  playerStand() {
    if (this.controlsBlocked()) return;
    this.runDealerTurn();
  }

  double() {
    if (this.controlsBlocked()) return;

    if (!this.player.doubleBid()) return;

    const [card] = this.deck.drawFromShoe(1);
    this.cardStates.addPlayerCard(card);

    if (this.cardStates.playerScore() > 21) {
      this.endRound(GameResult.Lose);
    } else {
      this.runDealerTurn();
    }
  }

  private async runDealerTurn() {
    this.controlsBlocked.set(true);
    this.cardStates.revealDealer();

    await this.delay(600);

    while (this.cardStates.dealerScore() < 17) {
      const [card] = this.deck.drawFromShoe(1);
      this.cardStates.addDealerCard(card);
      await this.delay(800);
    }

    this.determineWinner();
  }

  private determineWinner() {
    const pScore = this.cardStates.playerScore();
    const dScore = this.cardStates.dealerScore();

    if (dScore > 21) {
      this.endRound(GameResult.Win); // Dealer busted
    } else if (pScore > dScore) {
      this.endRound(GameResult.Win);
    } else if (pScore < dScore) {
      this.endRound(GameResult.Lose);
    } else {
      this.endRound(GameResult.Push);
    }
  }

  private endRound(result: GameResult): void {
    this.controlsBlocked.set(true);

    const bid = this.player.bid();
    switch (result) {
      case GameResult.Win:
        this.player.payout(bid * 2);
        break;
      case GameResult.BlackJack:
        this.player.payout(bid + bid * 1.5);
        break;
      case GameResult.Push:
        this.player.payout(bid);
        break;
    }

    this.message.setMessage(result, bid);

    setTimeout(() => {
      this.message.clearMessage();
      this.player.resetBid();
      this.cardStates.reset();
      this.gameState.initGame();
      this.controlsBlocked.set(false);
    }, 3000);
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
