import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './layout/top-bar/top-bar';
import { CardTable } from './layout/card-table/card-table';
import { BottomPanel } from './layout/bottom-panel/bottom-panel';
import { GameDialog } from './features/game-dialog/game-dialog';
import { GameState } from './core/services/game-state';
import { GameResultDialog } from './features/game-result-dialog/game-result-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, CardTable, BottomPanel, GameDialog, GameResultDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blackJack');

  private stateService = inject(GameState);
  state = this.stateService.gameState;
}
