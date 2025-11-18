import { Component, computed, inject } from '@angular/core';
import { Chip } from '../../../../shared/components/chip/chip';
import { ChipsService } from '../../../../core/services/chips-service';
import { CoreService } from '../../../../core/services/core-service';

@Component({
  selector: 'app-selected-chips',
  imports: [Chip],
  templateUrl: './selected-chips.html',
  styleUrl: './selected-chips.scss',
})
export class SelectedChips {
  private chipService = inject(ChipsService);
  private coreService = inject(CoreService);

  selectedChips = computed(() => {
    return this.chipService.selectedChips().map((chip, index) => {
      const posX = Math.floor(Math.random() * 9) + 1;
      const posY = index * 6;

      return { ...chip, posX, posY };
    });
  });
  selectedChipSum = this.chipService.selectedChipsSum;

  private maxChipColumns: number = 5;
  private maxChipsInColumn: number = 8;
  private columns: number = 1;
  private chipsInColumn: number = 1;

  clearChips(): void {
    this.chipService.clearSelectedChips();
  }

  startGame(): void {
    this.coreService.startGame();
  }
}
