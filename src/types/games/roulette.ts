enum RouletteSessionStatus {
    WaitingForPlayers = 0,
    BettingOpen = 1,
    Spinning = 2,
    RoundFinished = 3,
}

enum RouletteBetType {
    Green = 0,
    Red = 1,
    Black = 2,
}

interface RouletteBetEntryDto {
    userId: string;
    username: string;
    amount: number;
    betType: RouletteBetType;
}

interface RouletteDto {
    sessionId: string;
    status: RouletteSessionStatus;
    activeUsers: number;
    maxUsers: number;
    secondsLeft: number;
    winningNumber: number | null;
    winningColor: RouletteBetType | null;
    participants: string[];
    currentRoundBets: RouletteBetEntryDto[];
    totalOnRed: number;
    totalOnBlack: number;
    totalOnGreen: number;
}

export { RouletteSessionStatus, RouletteBetType, RouletteBetEntryDto, RouletteDto };
