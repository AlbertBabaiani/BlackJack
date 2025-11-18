import { Component, inject } from '@angular/core';
import { Chip } from '../../../../shared/components/chip/chip';
import { ChipsService } from '../../../../core/services/chips-service';
import { ChipType } from '../../../../shared/models/Chips';

@Component({
  selector: 'app-chip-selection',
  imports: [Chip],
  templateUrl: './chip-selection.html',
  styleUrl: './chip-selection.scss',
})
export class ChipSelection {
  private chipService = inject(ChipsService);

  chips = this.chipService.chips;

  selectChip(chipValue: ChipType): void {
    this.chipService.selectChip(chipValue);
  }
}
