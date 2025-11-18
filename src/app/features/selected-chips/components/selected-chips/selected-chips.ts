import { Component, computed, inject } from '@angular/core';
import { Chip } from '../../../../shared/components/chip/chip';
import { ChipsService } from '../../../../core/services/chips-service';

@Component({
  selector: 'app-selected-chips',
  imports: [Chip],
  templateUrl: './selected-chips.html',
  styleUrl: './selected-chips.scss',
})
export class SelectedChips {
  private chipService = inject(ChipsService);

  selectedChips = computed(() => {
    return this.chipService.selectedChips().map((chip, index) => {
      const posX = Math.floor(Math.random() * 9) + 1;
      const posY = index * 6;

      return { ...chip, posX, posY };
    });
  });
  selectedChipSum = this.chipService.selectedChipsSum;

  clearChips(): void {
    this.chipService.clearSelectedChips();
  }

  startGame(): void {
    this.coreService.startGame();
  }
}
