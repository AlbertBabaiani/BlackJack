export type Suits = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
export type Ranks = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
export type Values = 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;

export class Card {
  constructor(private _suit: Suits, private _rank: Ranks, private _value: Values) {}

  get suit() {
    return this._suit;
  }

  get rank() {
    return this._rank;
  }

  get value() {
    return this._value;
  }

  setAce1(): void {
    if (this._rank !== 'A' && this._value !== 11) return;

    this._value = 1;
  }
}
