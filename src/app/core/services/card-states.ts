import { computed, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';
import { GameResult } from '../../shared/models/GameResult';

@Injectable({
  providedIn: 'root',
})
export class CardStates {
  private _gameStarted = signal<boolean>(true);
  readonly gameStarted = this._gameStarted.asReadonly();

  private _playerCards = signal<Card[]>([]);
  readonly playerCards = this._playerCards.asReadonly();
  readonly playerSum = computed(() =>
    this._playerCards().reduce((prev, next) => prev + next.value, 0)
  );

  private _dealerCards = signal<Card[]>([]);
  readonly dealerCards = this._dealerCards.asReadonly();
  readonly dealerSum = computed(() =>
    this._dealerCards().reduce((prev, next) => prev + next.value, 0)
  );
  readonly displayedDealerSum = computed(() =>
    this.gameStarted()
      ? this._dealerCards()[0].value
      : this._dealerCards().reduce((prev, next) => prev + next.value, 0)
  );

  private shuffleTime = 2000;

  private _isAce = signal<boolean>(false);
  readonly isAce = this._isAce.asReadonly();

  delay(ms: number = this.shuffleTime) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setGameStarted(): void {
    this._gameStarted.set(false);
  }

  setInitialCards(cards: Card[]): GameResult | null {
    if (cards.length < 4) return null;

    const playerAce1 = this.checkAce(cards[0]);
    const playerAce2 = this.checkAce(cards[2]);
    if (playerAce1 && playerAce2) cards[2].setAce1();
    else {
      if (playerAce2) this._isAce.set(true);
    }

    const dealerAce1 = this.checkAce(cards[1]);
    const dealerAce2 = this.checkAce(cards[3]);
    if (dealerAce1 && dealerAce2) cards[3].setAce1();

    this._playerCards.set([cards[0], cards[2]]);
    this._dealerCards.set([cards[1], cards[3]]);
    return this.checkInitialCards([cards[0], cards[2]], [cards[1], cards[3]]);
  }

  private checkInitialCards(playerCards: Card[], dealerCards: Card[]): GameResult | null {
    const dealerSum = dealerCards.reduce((prev, next) => prev + next.value, 0);

    if (dealerSum === 21) {
      this._gameStarted.set(false);
      return GameResult.Lose;
    }

    const playerSum = playerCards.reduce((prev, next) => prev + next.value, 0);

    return playerSum === 21 ? GameResult.BlackJack : null;
  }

  private checkAce(card: Card): boolean {
    return card.rank === 'A' && card.value === 11;
  }

  private processAce(card: Card) {
    if (card.value + this.playerSum() > 21 && this.checkAce(card)) {
      card.setAce1();
    }
    //
    else if (this._isAce()) {
      const playerCards = this._playerCards();
      playerCards[playerCards.length - 1].setAce1();
      this._playerCards.set(playerCards);
      this._isAce.set(false);
    }
  }

  addPlayerCard(card: Card): GameResult | null {
    this.processAce(card);

    if (this.checkAce(card)) {
      this._isAce.set(true);
    }

    this._playerCards.update((arr) => [...arr, card]);

    return this.playerSum() > 21 ? GameResult.Lose : null;
  }

  addDealerCard(card: Card): GameResult | null {
    this._gameStarted.set(false);
    if (this.checkAce(card)) {
      card.setAce1();
    }

    this._dealerCards.update((arr) => [...arr, card]);

    return this.dealerSum() > 21 ? GameResult.Win : null;
  }

  double(card: Card): GameResult {
    this.processAce(card);

    this._playerCards.update((arr) => [...arr, card]);

    return this.playerSum() > 21 ? GameResult.Lose : GameResult.Win;
  }

  resetCards() {
    this._playerCards.set([]);
    this._dealerCards.set([]);
    this._isAce.set(false);
    this._gameStarted.set(true);
  }
}
