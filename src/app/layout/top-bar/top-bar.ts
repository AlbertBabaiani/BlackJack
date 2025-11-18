import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Player } from '../../core/services/player';

@Component({
  selector: 'app-top-bar',
  imports: [CurrencyPipe],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  private player = inject(Player);
  money = this.player.money;
}
