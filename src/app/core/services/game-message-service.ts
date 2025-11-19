import { inject, Injectable, signal } from '@angular/core';
import { GameMessages, GameResult } from '../../shared/models/GameResult';
import { GameState } from './game-state';

@Injectable({
  providedIn: 'root',
})
export class GameMessageService {
  private stateService = inject(GameState);

  private _message = signal<string | null>(null);
  readonly message = this._message.asReadonly();

  private _bid = signal<number | null>(null);
  readonly bid = this._bid.asReadonly();

  setMessage(gameResult: GameResult, bid: number): void {
    const msg = Object.hasOwn(GameMessages, gameResult);

    if (!msg) return;

    this._message.set(GameMessages[gameResult]);
    this._bid.set(bid);
  }

  clearMessage() {
    this._message.set(null);
    this._bid.set(null);
  }
}
