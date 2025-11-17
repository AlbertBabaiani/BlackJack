import { Component, inject } from '@angular/core';
import { CoreService } from '../../core/services/core-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [CurrencyPipe],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  private coreService = inject(CoreService);
  playerMoney = this.coreService.playerMoney;
}
