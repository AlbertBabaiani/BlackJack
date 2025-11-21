import { inject, Injectable } from '@angular/core';
import { CoreService } from '../../../../../core/services/core-service';
import { Player } from '../../../../../core/services/player';
import { ChipsService } from '../../../services/chips-service';

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
    this.coreService.startGame();
  }
}
