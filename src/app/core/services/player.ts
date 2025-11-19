import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Player {
  private _money = signal<number>(2000);
  readonly money = this._money.asReadonly();

  private _bid = signal<number>(0);
  readonly bid = this._bid.asReadonly();

  private subtract(amount: number) {
    if (amount > this._money()) return;

    this._money.update((val) => val - amount);
  }

  private add(amount: number) {
    if (amount < 0) return;

    this._money.update((val) => val + amount);
  }

  placeBid(bid: number): void {
    this._bid.set(bid);
    this.subtract(bid);
  }

  win(): void {
    this.add(this._bid() * 2);
  }

  push(): void {
    this.add(this._bid());
  }

  blackJack(): void {
    this.add(this._bid() * 1.5);
  }
}
