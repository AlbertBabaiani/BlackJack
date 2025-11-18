import { computed, inject, Injectable, signal } from '@angular/core';
import { CHIP_VALUES, ChipType } from '../../shared/models/Chips';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class ChipsService {
  private user = inject(User);
  private userMoney = this.user.money;

  private _chips = signal<ChipType[]>(CHIP_VALUES);
  readonly chips = this._chips.asReadonly();

  private _selectedChips = signal<ChipType[]>([]);
  readonly selectedChips = this._selectedChips.asReadonly();

  readonly selectedChipsSum = computed(() => {
    const chipValues = this._selectedChips();

    return chipValues.reduce((prev, current) => {
      return prev + current.value;
    }, 0);
  });

  selectChip(chipValue: ChipType) {
    const newSum = this.selectedChipsSum() + chipValue.value;
    if (newSum > this.userMoney()) return;
    this._selectedChips.update((chips) => [...chips, chipValue]);
  }

  clearSelectedChips() {
    this._selectedChips.set([]);
  }
}
