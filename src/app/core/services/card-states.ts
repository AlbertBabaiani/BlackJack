import { computed, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';
import { GameResult } from '../../shared/models/GameResult';

@Injectable({
  providedIn: 'root',
})
export class CardStates {
  private _playerCards = signal<Card[]>([]);
  readonly playerCards = this._playerCards.asReadonly();
  readonly playerScore = computed(() => this.calculateHandScore(this._playerCards()));

  private _dealerCards = signal<Card[]>([]);
  readonly dealerCards = this._dealerCards.asReadonly();
  readonly dealerScore = computed(() => this.calculateHandScore(this._dealerCards()));

  private _showDealerScore = signal<boolean>(false);
  readonly displayedDealerScore = computed(() => {
    if (!this._showDealerScore()) {
      return this._dealerCards().length > 0 ? this.calculateHandScore([this._dealerCards()[0]]) : 0;
    }
    return this.dealerScore();
  });

  private calculateHandScore(cards: Card[]): number {
    let score = 0;
    let aceCount = 0;

    for (const card of cards) {
      score += card.value;
      if (card.rank === 'A') aceCount++;
    }

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  setInitialCards(playerCards: Card[], dealerCards: Card[]) {
    this._playerCards.set(playerCards);
    this._dealerCards.set(dealerCards);
    this._showDealerScore.set(false);
  }

  addPlayerCard(card: Card) {
    this._playerCards.update((cards) => [...cards, card]);
  }

  addDealerCard(card: Card) {
    this._dealerCards.update((cards) => [...cards, card]);
  }

  revealDealer() {
    this._showDealerScore.set(true);
  }

  reset() {
    this._playerCards.set([]);
    this._dealerCards.set([]);
    this._showDealerScore.set(false);
  }
}
