import { Component, inject } from '@angular/core';
import { CoreService } from '../../core/services/core-service';

@Component({
  selector: 'app-game-action-buttons',
  imports: [],
  templateUrl: './game-action-buttons.html',
  styleUrl: './game-action-buttons.scss',
})
export class GameActionButtons {
  private service = inject(CoreService);

  hit(): void {
    this.service.playerHit();
  }

  stand(): void {
    this.service.playerStand();
  }

  double(): void {
    this.service.double();
  }
}
