import { Component, input } from '@angular/core';
import { Ranks, Suits } from '../../models/Card';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  suits = input.required({ transform: (val: Suits) => val.toLowerCase() });
  rank = input.required({ transform: (val: Ranks) => val.toLowerCase() });

  isFlipped = input.required<boolean>();
}
