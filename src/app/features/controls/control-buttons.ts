import { Component, inject } from '@angular/core';
import { CoreService } from '../../core/services/core-service';

@Component({
  selector: 'app-control-buttons',
  imports: [],
  templateUrl: './control-buttons.html',
  styleUrl: './control-buttons.scss',
})
export class ControlButtons {
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
