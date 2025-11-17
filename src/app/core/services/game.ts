import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Game {
  private _playerSum = signal<number>(0);
  private playerSum = this._playerSum.asReadonly();

  private _dealerSum = signal<number>(0);
  private dealerSum = this._dealerSum();

  resetValues(): void {
    this._playerSum.set(0);
    this._dealerSum.set(0);
  }
}
