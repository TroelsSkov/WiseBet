import type { GameRequest, GameResponse } from "./game";

enum CoinflipSide {
    Wise,
    Coin
}

interface CoinflipGameResponse extends GameResponse {
    landingSide: CoinflipSide;
}

interface CoinflipGameRequest extends GameRequest {
    choice: CoinflipSide;
}

export { CoinflipGameRequest, CoinflipGameResponse, CoinflipSide };