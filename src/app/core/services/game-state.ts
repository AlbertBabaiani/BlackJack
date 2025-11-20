import { Injectable, signal } from '@angular/core';
import { GameStates } from '../../shared/models/GameStates';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private _gameState = signal<GameStates>(GameStates.Opened);
  readonly gameState = this._gameState.asReadonly();

  initGame(): void {
    this._gameState.set(GameStates.Initialized);
  }

  startGame() {
    this._gameState.set(GameStates.GameInProgress);
  }
}
