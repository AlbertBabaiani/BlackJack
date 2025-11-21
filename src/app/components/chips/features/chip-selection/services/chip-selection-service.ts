import { inject, Injectable } from '@angular/core';
import { ChipsService } from '../../../../../core/services/chips-service';
import { ChipType } from '../../../models/Chips';

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
