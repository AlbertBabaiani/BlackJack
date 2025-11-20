import { inject, Injectable } from '@angular/core';
import { GameState } from '../../../core/services/game-state';
import { Player } from '../../../core/services/player';

@Injectable({
  providedIn: 'root',
})
export class BottomPanelService {
  private stateService = inject(GameState);
  state = this.stateService.gameState;

  private player = inject(Player);
  money = this.player.money;
  bid = this.player.bid;
}
