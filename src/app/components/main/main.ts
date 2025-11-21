import { Component, inject } from '@angular/core';
import { Card as CardComponent } from '../../shared/components/card/card';
import { CardStates } from '../../core/services/card-states';
import { Card } from '../../shared/models/Card';

@Component({
  selector: 'app-main',
  imports: [CardComponent],
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

  private smallGapPx: number = 48;
  private smallGapRem: number = 3;
  private smallInitialRem: number = 17;

  private bigGapPx: number = 65;
  private bigGapRem: number = 4.063;
  private bigInitialRem: number = 18;

  private columnBreakPoint: number = 8;

  calculateColumnGap(cards: Card[]) {
    if (cards.length <= 0) return 0;
    return cards.length < this.columnBreakPoint ? this.bigGapPx : this.smallGapPx;
  }

  calculateWidth(cards: Card[]): number {
    if (cards.length === 2) return this.bigInitialRem;

    if (cards.length < this.columnBreakPoint) return (cards.length - 2) * this.bigGapRem + 18;

    return (cards.length - 2) * this.smallGapRem + this.smallInitialRem;
  }
}
