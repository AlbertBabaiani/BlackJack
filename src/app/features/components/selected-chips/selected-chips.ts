import { Component } from '@angular/core';
import { Chip } from '../../../shared/components/chip/chip';

@Component({
  selector: 'app-selected-chips',
  imports: [Chip],
  templateUrl: './selected-chips.html',
  styleUrl: './selected-chips.scss',
})
export class SelectedChips {}
