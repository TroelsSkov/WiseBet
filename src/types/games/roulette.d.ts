import type { GameRequest, GameResponse } from "./game";

enum RouletteColor {
    Black = 0,
    Green = 1,
    Red = 2,
}

interface RouletteGameRequest extends GameRequest {
    choice: RouletteColor;
}

interface RouletteGameResponse extends GameResponse {
    result: number;
}

interface RouletteBetEntry {
    username: string;
    amount: number;
}

export { RouletteColor, RouletteGameRequest, RouletteGameResponse, RouletteBetEntry };
