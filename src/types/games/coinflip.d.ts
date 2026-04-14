enum CoinflipOutcome {
    Wise,
    Coin
}

interface CoinflipGameResponse {
    id: number;
    outcome: CoinflipOutcome;
}

interface CoinflipGameRequest {
    id: number;
    bet: number;
    outcome: CoinflipOutcome;
}