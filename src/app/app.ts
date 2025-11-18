import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './layout/top-bar/top-bar';
import { CardTable } from './layout/card-table/card-table';
import { BottomPanel } from './layout/bottom-panel/bottom-panel';
import { GameDialog } from './features/game-dialog/components/game-dialog/game-dialog';
import { GameState } from './core/services/game-state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, CardTable, BottomPanel, GameDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blackJack');

  private state = inject(GameState);
  gameInitialized = this.state.gameInitialized;
}
