import { Component, inject } from '@angular/core';
import { ChipSelectionService } from '../../services/chip-selection-service';
import { ChipType } from '../../../../models/Chips';
import { Chip } from '../../../../components/chip/chip';

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
