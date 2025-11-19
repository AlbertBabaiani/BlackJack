import { Component, inject } from '@angular/core';
import { SelectedChips } from '../../features/selected-chips/components/selected-chips/selected-chips';
import { GameState } from '../../core/services/game-state';
import { Main } from '../../features/main/components/main/main';

@Component({
  selector: 'app-card-table',
  imports: [SelectedChips, Main],
  templateUrl: './card-table.html',
  styleUrl: './card-table.scss',
})
export class CardTable {
  private stateService = inject(GameState);

  state = this.stateService.gameState;
}
