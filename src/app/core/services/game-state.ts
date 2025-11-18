import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private _gameInitialized = signal<boolean>(false);
  readonly gameInitialized = this._gameInitialized.asReadonly();

  private _chips_selection = signal<boolean>(false);
  readonly chips_selection = this._chips_selection.asReadonly();

  private _gameInProgress = signal<boolean>(false);
  readonly gameInProgress = this._gameInProgress.asReadonly();

  initGame(): void {
    this._gameInitialized.set(true);
  }

  startChipsSelection(): void {
    this._chips_selection.set(true);
  }

  doneChipsSelection(): void {
    this._chips_selection.set(false);
  }

  startGame() {
    this._gameInProgress.set(true);
  }

  endGame() {
    this._gameInProgress.set(false);
  }
}
