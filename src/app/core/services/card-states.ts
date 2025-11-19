import { computed, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';
import { GameResult } from '../../shared/models/GameResult';

@Injectable({
  providedIn: 'root',
})
export class CardStates {
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

  setInitialCards(cards: Card[]): GameResult | null {
    if (cards.length < 4) return null;

    this._playerCards.set([cards[0], cards[2]]);
    this._dealerCards.set([cards[1], cards[3]]);

    return this.checkInitialCards([cards[0], cards[2]], [cards[1], cards[3]]);
  }

  private checkInitialCards(playerCards: Card[], dealerCards: Card[]): GameResult | null {
    const dealerSum = dealerCards.reduce((prev, next) => prev + next.value, 0);

    if (dealerSum === 21) {
      return GameResult.Lose;
    }

    const playerSum = playerCards.reduce((prev, next) => prev + next.value, 0);

    if (playerSum === 21) {
      return GameResult.BlackJack;
    }

    return null;
  }

  addPlayerCard(card: Card): GameResult | null {
    if (this.playerSum() > 21) return GameResult.Lose;

    this._playerCards.update((arr) => [...arr, card]);

    if (this.playerSum() > 21) {
      return GameResult.Lose;
    }

    return null;
  }

  addDealerCard(card: Card): GameResult | null {
    if (this.dealerSum() > 21) return GameResult.Win;

    this._dealerCards.update((arr) => [...arr, card]);

    if (this.dealerSum() > 21) {
      return GameResult.Win;
    }

    return null;
  }
}
