import { Component, inject } from '@angular/core';
import { SelectedChipsService } from '../../services/selected-chips-service';
import { Chip } from '../../../../../../shared/components/chip/chip';

@Component({
  selector: 'app-selected-chips',
  imports: [Chip],
  templateUrl: './selected-chips.html',
  styleUrl: './selected-chips.scss',
})
export class SelectedChips {
  private service = inject(SelectedChipsService);

  chips = this.service.chips;

  chipsSum = this.service.chipsSum;

  clearChips(): void {
    this.service.clearChips();
  }

  startGame(): void {
    this.service.startGame();
  }

  resetMoney(): void {
    this.service.resetMoney();
  }
}
