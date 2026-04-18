import type { GameRequest, GameResponse } from "./game";

// Virker ikke i BetPanel.tsx
enum CoinflipSide {
    Wise = 0,
    Coin = 1
}

interface CoinflipGameResponse extends GameResponse {
    landingSide: CoinflipSide;
}

interface CoinflipGameRequest extends GameRequest {
    choice: CoinflipSide;
}

export { CoinflipGameRequest, CoinflipGameResponse, CoinflipSide };