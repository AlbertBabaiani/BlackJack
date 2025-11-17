import { computed, Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/Card';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private readonly Suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  private readonly Ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

  private _cards = signal<Card[]>([]);
  readonly cards = this._cards.asReadonly();

  private deckQuantity: number = 6;

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

  // States
  private _gameInProgress = signal<boolean>(false);
  readonly gameInProgress = this._gameInProgress.asReadonly();

  private _canSplit = signal<boolean>(true);
  readonly canSplit = this._canSplit.asReadonly();

  private startingMoney = 2000;
  private _playerMoney = signal<number>(this.startingMoney);
  readonly playerMoney = this._playerMoney.asReadonly();

  private _selectedBet = signal<number>(200);
  readonly selectedBet = this._selectedBet.asReadonly();

  constructor() {
    this.createDeck(this.deckQuantity);
    this.shuffle();
  }

  private getCardValue(rank: string): number {
    if (rank === 'A') {
      return 11;
    }

    if (['K', 'Q', 'J'].includes(rank)) {
      return 10;
    }

    return parseInt(rank, 10);
  }

  private createDeck(deckQuantity: number) {
    this.Suits.forEach((suit) => {
      this.Ranks.forEach((rank) => {
        const value = this.getCardValue(rank);

        for (let i = 0; i < deckQuantity; i++) {
          const card = new Card(suit, rank, value);
          this._cards.update((arr) => [...arr, card]);
        }
      });
    });
  }

  private shuffle(): void {
    for (let i = this._cards().length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards()[i], this._cards()[j]] = [this._cards()[j], this._cards()[i]];
    }
  }

  private drawFromShoe(quantity: number): Card[] {
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

  private checkInitialCards() {
    if (this.dealerSum() === 21) {
      console.log('You lose!');
      return;
    }

    if (this.playerSum() === 21) {
      console.log('BlackJack! You Win!');
      this._playerMoney.update((money) => money * 1.5);
      return;
    }

    const playerCards = this._playerCards().slice(0, 2);
    if (playerCards[0].rank === playerCards[1].rank) {
      this._canSplit.set(true);
      console.log('Can Split');
    }
  }

  startGame() {
    if (this._selectedBet() === 0) return;
    if (this._playerMoney() <= 0) return;

    console.log('aa');

    this._gameInProgress.set(true);

    const cards = this.drawFromShoe(4);

    if (cards.length < 4) return;

    this._playerCards.set([cards[0], cards[2]]);
    this._dealerCards.set([cards[1], cards[3]]);

    this._playerMoney.update((money) => money - this._selectedBet());
    this.checkInitialCards();
  }

  selectBet(bet: number) {
    if (bet > this._playerMoney()) return;
    this._selectedBet.set(bet);
  }

  playerHit() {
    const cards = this.drawFromShoe(4);

    if (cards.length < 1) return;

    this._playerCards.update((val) => [...val, cards[0]]);
  }

  private dealerHit() {
    while (
      (this.dealerSum() < this.playerSum() || this.dealerSum() <= 16) &&
      this.dealerSum() <= 21
    ) {
      const cards = this.drawFromShoe(4);

      if (cards.length < 1) return;

      this._dealerCards.update((val) => [...val, cards[0]]);
    }
  }

  stand() {
    if (this.dealerSum() <= 16) {
      this.dealerHit();
    }
  }

  resetValues(): void {
    this._playerCards.set([]);
    this._dealerCards.set([]);
    this._canSplit.set(false);
  }
}

/*
Width: 150px - 200px

Height: 210px - 280px (maintaining a 7:10 aspect ratio, common for playing cards)

Example: 175px (width) x 245px (height)
*/
