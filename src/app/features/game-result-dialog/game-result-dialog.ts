import { Component, inject } from '@angular/core';
import { GameMessageService } from '../../core/services/game-message-service';
import { CurrencyPipe } from '@angular/common';

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
