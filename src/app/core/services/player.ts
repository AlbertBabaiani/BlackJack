import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Player {
  private readonly startingMoney = 20000;

  private _money = signal<number>(this.startingMoney);
  readonly money = this._money.asReadonly();

  private _bid = signal<number>(0);
  readonly bid = this._bid.asReadonly();

  placeBid(amount: number): boolean {
    if (amount > this._money()) return false;
    this._bid.set(amount);
    this._money.update((m) => m - amount);
    return true;
  }

  doubleBid(): boolean {
    const currentBid = this._bid();
    if (this._money() < currentBid) return false;

    this._money.update((m) => m - currentBid);
    this._bid.update((b) => b * 2);
    return true;
  }

  payout(amount: number) {
    this._money.update((m) => m + amount);
  }

  resetBid() {
    this._bid.set(0);
  }

  resetMoney() {
    this._money.set(this.startingMoney);
  }
}
