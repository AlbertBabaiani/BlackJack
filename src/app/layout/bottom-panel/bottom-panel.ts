import { Component, inject } from '@angular/core';
import { ChipSelection } from '../../features/chip-selection/components/chip-selection/chip-selection';
import { GameActionButtons } from '../../features/game-action-buttons/components/game-action-buttons/game-action-buttons';
import { GameState } from '../../core/services/game-state';

@Component({
  selector: 'app-bottom-panel',
  imports: [ChipSelection, GameActionButtons],
  templateUrl: './bottom-panel.html',
  styleUrl: './bottom-panel.scss',
})
export class BottomPanel {
  private gameState = inject(GameState);
  gameInitialized = this.gameState.gameInitialized;
  gameStarted = this.gameState.gameInProgress;
}
