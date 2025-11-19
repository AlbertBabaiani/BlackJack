import { Component, signal } from '@angular/core';
import { GameResult } from '../../shared/models/GameResult';

@Component({
  selector: 'app-game-result-dialog',
  imports: [],
  templateUrl: './game-result-dialog.html',
  styleUrl: './game-result-dialog.scss',
})
export class GameResultDialog {
  private _message = signal<string | null>(null);
  readonly message = this._message.asReadonly();

  setMessage(gameResult: GameResult): void {
    this._message.set('');
  }
}
