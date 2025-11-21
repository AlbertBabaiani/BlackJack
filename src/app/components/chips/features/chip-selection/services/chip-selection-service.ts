import { inject, Injectable } from '@angular/core';
import { ChipType } from '../../../models/Chips';
import { ChipsService } from '../../../services/chips-service';

@Injectable({
  providedIn: 'root',
})
export class ChipSelectionService {
  private chipsService = inject(ChipsService);
  chips = this.chipsService.chips;

  selectChip(chipValue: ChipType): void {
    this.chipsService.selectChip(chipValue);
  }
}
