import { inject, Injectable } from '@angular/core';
import { ChipsService } from '../../../core/services/chips-service';
import { CoreService } from '../../../core/services/core-service';

@Injectable({
  providedIn: 'root',
})
export class SelectedChipsService {
  private chipsService = inject(ChipsService);
  private coreService = inject(CoreService);

  selectedChips = this.chipsService.selectedChips;
}
