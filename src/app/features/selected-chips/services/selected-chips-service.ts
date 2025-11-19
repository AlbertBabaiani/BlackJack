import { inject, Injectable } from '@angular/core';
import { ChipsService } from '../../../core/services/chips-service';
import { CoreService } from '../../../core/services/core-service';
import { Player } from '../../../core/services/player';

@Injectable({
  providedIn: 'root',
})
export class SelectedChipsService {
  private coreService = inject(CoreService);
  private chipsService = inject(ChipsService);
  private player = inject(Player);

  chips = this.chipsService.selectedChips;
  chipsSum = this.chipsService.selectedChipsSum;

  clearChips(): void {
    this.chipsService.clearSelectedChips();
  }

  startGame() {
    if (this.chipsService.selectedChipsSum() > this.player.money()) return;
    if (this.chipsService.selectedChipsSum() <= 0) return;

    this.player.placeBid(this.chipsSum());
    // this.chipsService.clearSelectedChips();
    this.coreService.startGame();
  }

  resetMoney() {
    this.player.resetMoney();
  }
}
