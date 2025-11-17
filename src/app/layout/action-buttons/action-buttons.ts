import { Component, inject, signal } from '@angular/core';
import { CoreService } from '../../core/services/core-service';
import { Chip } from '../../shared/components/chip/chip';

@Component({
  selector: 'app-action-buttons',
  imports: [Chip],
  templateUrl: './action-buttons.html',
  styleUrl: './action-buttons.scss',
})
export class ActionButtons {
  private coreService = inject(CoreService);

  private _chips = signal<string[]>(['50', '100', '200', '500', '1K', '2K']);
  readonly chips = this._chips.asReadonly();

  startGame(): void {
    this.coreService.startGame();
  }

  hit(): void {
    this.coreService.playerHit();
  }
}
