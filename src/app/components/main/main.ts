import { Component, inject } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { CardStates } from '../../core/services/card-states';

@Component({
  selector: 'app-main',
  imports: [Card],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private service = inject(CardStates);

  playerCards = this.service.playerCards;
  dealerCards = this.service.dealerCards;

  playerSum = this.service.playerSum;
  dealerSum = this.service.dealerSum;

  isAcePresent = this.service.isAce;
  gameStarted = this.service.gameStarted;
}
