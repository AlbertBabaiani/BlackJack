import { Component, inject } from '@angular/core';
import { CoreService } from '../../../../core/services/core-service';

@Component({
  selector: 'app-game-dialog',
  imports: [],
  templateUrl: './game-dialog.html',
  styleUrl: './game-dialog.scss',
})
export class GameDialog {
  private coreService = inject(CoreService);

  startGame() {
    this.coreService.initGame();
  }
}
