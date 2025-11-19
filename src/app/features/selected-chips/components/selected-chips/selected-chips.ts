import { Component, computed, inject } from '@angular/core';
import { Chip } from '../../../../shared/components/chip/chip';
import { ChipsService } from '../../../../core/services/chips-service';
import { SelectedChipsService } from '../../services/selected-chips-service';

@Component({
  selector: 'app-selected-chips',
  imports: [Chip],
  templateUrl: './selected-chips.html',
  styleUrl: './selected-chips.scss',
})
export class SelectedChips {
  private service = inject(SelectedChipsService);

  chips = computed(() => {
    return this.service.chips().map((chip, index) => {
      const posX = Math.floor(Math.random() * 9) + 1;
      const posY = index * 6;

      return { ...chip, posX, posY };
    });
  });

  chipsSum = this.service.chipsSum;
  clearChips(): void {
    this.service.clearChips();
  }

  startGame(): void {
    this.service.startGame();
  }
}
