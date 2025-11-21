import { Component, inject } from '@angular/core';
import { GameState } from '../../core/services/game-state';
import { Main } from '../../components/main/main';
import { SelectedChips } from '../../components/chips/features/selected-chips/components/selected-chips/selected-chips';

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
