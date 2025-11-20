import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CHIP_VALUES, ChipType, SelectedChip } from '../../shared/models/Chips';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class ChipsService {
  private player = inject(Player);
  private playerMoney = this.player.money;
  private playerBid = this.player.bid;

  private _chips = signal<ChipType[]>(CHIP_VALUES);
  readonly chips = this._chips.asReadonly();

  private _selectedChips = signal<SelectedChip[]>([]);
  readonly selectedChips = this._selectedChips.asReadonly();

  readonly selectedChipsSum = computed(() => {
    const chipValues = this._selectedChips();

    return chipValues.reduce((prev, current) => {
      return prev + current.value;
    }, 0);
  });

  constructor() {
    effect(() => {
      if (this.playerMoney() + this.playerBid() < this.selectedChipsSum()) {
        this.clearSelectedChips();
      }
    });
  }

  private readonly maxChipsInColumn: number = 6;
  private readonly maxChipsColumn: number = 7;
  private readonly columnGap: number = 120;
  private readonly rowGap: number = 8;
  private currentColumn: number = 0;

  selectChip(chip: ChipType) {
    const newSum = this.selectedChipsSum() + chip.value;
    if (newSum > this.playerMoney()) return;

    const index = this._selectedChips().length;

    this.currentColumn = Math.floor(index / this.maxChipsInColumn);
    const leftChipsInColumn = index % ((this.currentColumn || 1) * this.maxChipsInColumn);

    if (this.currentColumn + 1 > this.maxChipsColumn) return;

    const posX = Math.floor(Math.random() * 9) + 1 + this.currentColumn * this.columnGap;
    const posY = leftChipsInColumn * this.rowGap;

    const newChip: SelectedChip = { ...chip, posX, posY };
    this._selectedChips.update((chips) => [...chips, newChip]);
  }

  clearSelectedChips() {
    this._selectedChips.set([]);
    this.currentColumn = 0;
  }
}
