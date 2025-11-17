import { Component, inject } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { CoreService } from '../../core/services/core-service';

@Component({
  selector: 'app-card-table',
  imports: [Card],
  templateUrl: './card-table.html',
  styleUrl: './card-table.scss',
})
export class CardTable {
  private coreService = inject(CoreService);

  gameInProgress = this.coreService.gameInProgress;

  playerCards = this.coreService.playerCards;
  dealerCards = this.coreService.dealerCards;

  playerSum = this.coreService.playerSum;
  dealerSum = this.coreService.dealerSum;
}
