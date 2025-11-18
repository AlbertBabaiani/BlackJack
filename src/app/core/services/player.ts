import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Player {
  private _money = signal<number>(2000);
  readonly money = this._money.asReadonly();

  subtract(amount: number) {
    if (amount > this._money()) return;

    this._money.update((val) => val - amount);
  }

  add(amount: number) {
    if (amount < 0) return;

    this._money.update((val) => val + amount);
  }
}
