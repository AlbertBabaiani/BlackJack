import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { GameMessageService } from '../../../core/services/game-message-service';

@Component({
  selector: 'app-game-result-dialog',
  imports: [CurrencyPipe],
  templateUrl: './game-result-dialog.html',
  styleUrl: './game-result-dialog.scss',
})
export class GameResultDialog {
  private service = inject(GameMessageService);
  message = this.service.message;
  bid = this.service.bid;
}
