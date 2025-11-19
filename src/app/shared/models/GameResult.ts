export enum GameResult {
  Lose,
  Push,
  BlackJack,
  Win,
}

export type GameMessages = {
  0: 'You Lose!';
  1: 'Push!';
  2: 'BlackJack! You Won!';
  3: 'You Won!';
};
