import { Component, inject } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { CardStates } from '../../../../core/services/card-states';

@Component({
  selector: 'app-main',
  imports: [Card],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private cardStates = inject(CardStates);

  playerCards = this.cardStates.playerCards;
  dealerCards = this.cardStates.dealerCards;

  playerSum = this.cardStates.playerSum;
  dealerSum = this.cardStates.dealerSum;
}
