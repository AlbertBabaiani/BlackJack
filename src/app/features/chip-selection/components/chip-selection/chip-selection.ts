import { Component, inject } from '@angular/core';
import { Chip } from '../../../../shared/components/chip/chip';
import { ChipType } from '../../../../shared/models/Chips';
import { ChipSelectionService } from '../../services/chip-selection-service';

@Component({
  selector: 'app-chip-selection',
  imports: [Chip],
  templateUrl: './chip-selection.html',
  styleUrl: './chip-selection.scss',
})
export class ChipSelection {
  private service = inject(ChipSelectionService);

  chips = this.service.chips;

  selectChip(chipValue: ChipType): void {
    this.service.selectChip(chipValue);
  }
}
