import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionButtons } from './layout/action-buttons/action-buttons';
import { TopBar } from './layout/top-bar/top-bar';
import { CardTable } from './layout/card-table/card-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ActionButtons, TopBar, CardTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blackJack');
}
