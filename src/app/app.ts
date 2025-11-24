import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardTable } from './layout/card-table/card-table';
import { BottomPanel } from './layout/bottom-panel/components/bottom-panel/bottom-panel';
import { GameState } from './core/services/game-state';
import { GameResultDialog } from './components/dialogs/game-result-dialog/game-result-dialog';
import { StartMenu } from './features/start-menu/components/start-menu/start-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardTable, BottomPanel, StartMenu, GameResultDialog, StartMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blackJack');

  private stateService = inject(GameState);
  state = this.stateService.gameState;
}
