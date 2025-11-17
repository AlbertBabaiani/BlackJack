export class Card {
  constructor(private _suit: string, private _rank: string, private _value: number) {}

  get suit() {
    return this._suit;
  }

  get rank() {
    return this._rank;
  }

  get value() {
    return this._value;
  }
}
