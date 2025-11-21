import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class Chip {
  value = input.required<string>();
  hoverEffect = input.required<boolean>();
}
