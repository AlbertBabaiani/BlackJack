import { Injectable, signal } from '@angular/core';
import { Card, Ranks, Suits, Values } from '../../shared/models/Card';

@Injectable({
  providedIn: 'root',
})
export class Deck {
  private readonly Suits: Suits[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  private readonly Ranks: Ranks[] = [
    'A',
    'K',
    'Q',
    'J',
    '10',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
  ];

  private _cards = signal<Card[]>([]);
  readonly cards = this._cards.asReadonly();

  private deckQuantity: number = 6;

  private getCardValue(rank: string): Values {
    if (rank === 'A') return 11;

    if (['K', 'Q', 'J'].includes(rank)) return 10;

    return parseInt(rank, 10) as Values;
  }

  createDeck(quantity: number = this.deckQuantity) {
    let newShoe: Card[] = [];

    for (let i = 0; i < quantity; i++) {
      this.Suits.forEach((suit) => {
        this.Ranks.forEach((rank) => {
          newShoe.push(new Card(suit, rank, this.getCardValue(rank)));
        });
      });
    }

    this._cards.set(this.shuffle(newShoe));
  }

  private shuffle(deck: Card[]): Card[] {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  }

  drawFromShoe(quantity: number): Card[] {
    const currentShoe = this._cards();

    if (quantity > currentShoe.length) {
      console.error('Shoe is empty!');
      return [];
    }

    const dealtCards = currentShoe.slice(0, quantity);
    const remainingShoe = currentShoe.slice(quantity);

    this._cards.set(remainingShoe);
    return dealtCards;
  }
}
