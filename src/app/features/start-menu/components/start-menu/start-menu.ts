import { Component } from '@angular/core';

@Component({
  selector: 'app-start-menu',
  imports: [],
  templateUrl: './start-menu.html',
  styleUrl: './start-menu.scss',
})
export class StartMenu {
  selectedDecks = 6; // Default to 6 decks

  selectDecks(num: number) {
    this.selectedDecks = num;
  }

  startGame() {
    console.log(`Starting game with ${this.selectedDecks} decks...`);
    // Navigate to game route
  }

  openRules() {
    console.log('Opening Rules modal...');
  }

  openProfile() {
    console.log('Opening Profile modal...');
  }
}
