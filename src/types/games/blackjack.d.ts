export interface Card {
  rank: number; // 2..14 (Two..Ace)
  suit: number; // 0..3 (Hearts..Spades)
}

export type GameStatus =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5;

export interface BlackjackGameResponse {
  playerHand: Card[];
  dealerVisibleHand: Card[];
  status: GameStatus;
  dealerScore: number;
  playerScore: number;
}

export interface BlackjackGameRequest {
  amount: number;
}
