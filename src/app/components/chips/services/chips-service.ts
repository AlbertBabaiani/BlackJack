import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Player } from '../../../core/services/player';
import { CHIP_VALUES, ChipType, SelectedChip } from '../models/Chips';

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
  private readonly maxChipsColumn: number = 6;
  private readonly columnGap: number = 120;
  private readonly rowGap: number = 8;
  private currentColumn: number = 0;
  private columns: { [key: string]: { x: number; y: number } } = {
    '0': { x: 2 * this.columnGap, y: 2 * this.rowGap },
    '1': { x: 3 * this.columnGap, y: 3 * this.rowGap },
    '2': {
      x: 1 * this.columnGap,
      y: 1 * this.rowGap + this.rowGap * this.maxChipsInColumn,
    },
    '3': {
      x: 4 * this.columnGap,
      y: 2 * this.rowGap + this.rowGap * this.maxChipsInColumn,
    },
    '4': {
      x: 1 * this.columnGap + this.columnGap / 2 + this.columnGap / 4 + this.columnGap / 6,
      y: 3 * this.maxChipsInColumn * this.rowGap,
    },
    '5': {
      x: 4 * this.columnGap - this.columnGap / 2 - this.columnGap / 4 - this.columnGap / 6,
      y: 3 * this.maxChipsInColumn * this.rowGap + this.rowGap,
    },
  };

  selectChip(chip: ChipType) {
    const newSum = this.selectedChipsSum() + chip.value;
    if (newSum > this.playerMoney()) return;

    const index = this._selectedChips().length;

    this.currentColumn = Math.floor(index / this.maxChipsInColumn);
    const leftChipsInColumn = index % ((this.currentColumn || 1) * this.maxChipsInColumn);

    if (this.currentColumn + 1 > this.maxChipsColumn) return;

    // const posX = Math.floor(Math.random() * 9) + 1 + this.currentColumn * this.columnGap;
    const posX = Math.floor(Math.random() * 9) + 1 + this.columns[this.currentColumn.toString()].x;
    const posY = leftChipsInColumn * this.rowGap + this.columns[this.currentColumn.toString()].y;

    const newChip: SelectedChip = { ...chip, posX, posY };
    this._selectedChips.update((chips) => [...chips, newChip]);
  }

  clearSelectedChips() {
    this._selectedChips.set([]);
    this.currentColumn = 0;
  }
}
