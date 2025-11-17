import { Component, inject, signal } from '@angular/core';
import { CoreService } from '../../core/services/core-service';

@Component({
  selector: 'app-action-buttons',
  imports: [],
  templateUrl: './action-buttons.html',
  styleUrl: './action-buttons.scss',
})
export class ActionButtons {
  private coreService = inject(CoreService);

  private _chips = signal<number[]>([50, 100, 200, 500, 1000, 2000]);
  readonly chips = this._chips.asReadonly();

  startGame(): void {
    this.coreService.startGame();
  }

  hit(): void {
    this.coreService.playerHit();
  }
}
