import { computed, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';

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

  setInitialCards(cards: Card[]): void {
    if (cards.length < 4) return;

    this._playerCards.set([cards[0], cards[2]]);
    this._dealerCards.set([cards[1], cards[3]]);
  }

  addPlayerCard(card: Card) {
    this._playerCards.update((arr) => [...arr, card]);
  }
}
