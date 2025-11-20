import { Component, inject } from '@angular/core';
import { ChipSelection } from '../../../../features/chip-selection/components/chip-selection/chip-selection';
import { GameActionButtons } from '../../../../features/game-action-buttons/game-action-buttons';
import { GameState } from '../../../../core/services/game-state';
import { BottomPanelService } from '../../services/bottom-panel-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-bottom-panel',
  imports: [ChipSelection, GameActionButtons, CurrencyPipe],
  templateUrl: './bottom-panel.html',
  styleUrl: './bottom-panel.scss',
})
export class BottomPanel {
  private service = inject(BottomPanelService);
  state = this.service.state;

  money = this.service.money;
  bid = this.service.bid;
}
