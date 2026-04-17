import type { SignalRArguments } from "../signalr";

interface GameRequest {
    amount: number;
}

interface GameResponse extends SignalRArguments {
    winnings: number;
    fail: boolean;
    message: string;
}

export { GameRequest, GameResponse };