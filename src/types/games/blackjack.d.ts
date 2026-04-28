export interface Card {
  rank: number; // 2..14 (Two..Ace)
  suit: number; // 0..3 (Hearts..Spades)
}

export type GameStatus =
  | "Playing"
  | "PlayerBust"
  | "DealerBust"
  | "PlayerWin"
  | "DealerWin"
  | "Push";

export interface BlackjackGameResponse {
  playerHand: Card[];
  dealerVisibleHand: Card[];
  status: GameStatus;
}

export interface BlackjackGameRequest {
  amount: number;
}
