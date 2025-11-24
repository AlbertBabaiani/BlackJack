import { Component, inject } from '@angular/core';
import { GameState } from '../../../../core/services/game-state';
import { BottomPanelService } from '../../services/bottom-panel-service';
import { CurrencyPipe } from '@angular/common';
import { ChipSelection } from '../../../../components/chips/features/chip-selection/components/chip-selection/chip-selection';
import { ControlButtons } from '../../../../features/controls/control-buttons';

@Component({
  selector: 'app-bottom-panel',
  imports: [ChipSelection, ControlButtons, CurrencyPipe],
  templateUrl: './bottom-panel.html',
  styleUrl: './bottom-panel.scss',
})
export class BottomPanel {
  private service = inject(BottomPanelService);
  state = this.service.state;

  money = this.service.money;
  bid = this.service.bid;
}
