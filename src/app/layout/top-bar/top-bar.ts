import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { User } from '../../core/services/user';

@Component({
  selector: 'app-top-bar',
  imports: [CurrencyPipe],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  private user = inject(User);
  money = this.user.money;
}
