import { useEffect, useRef, useState } from "react";
import NumberHistory, { getRouletteColor } from "../../components/games/roulette/NumberHistory";
import RouletteRoller from "../../components/games/roulette/RouletteRoller";
import BettingColumn from "../../components/games/roulette/BettingColumn";
import { connection } from "../../components/games/roulette/signalr";
import type { RouletteBetEntry } from "../../types/games/roulette";
import { formatNumber } from "../../utils/formatNumber";

const TEMP_USER_ID = "00000000-0000-0000-0000-000000000000";

const ROUND_DURATION = 30;
const LOCK_AT = 5;

const COLOR_TO_INT: Record<"black" | "green" | "red", number> = {
    black: 0,
    green: 1,
    red: 2,
};

const MOCK_HISTORY = [17, 0, 24, 3, 34, 21, 10, 7, 15, 32, 6, 1, 28, 11, 19];

const MOCK_BETS: Record<"black" | "green" | "red", RouletteBetEntry[]> = {
    black: [
        { username: "drietgangsta", amount: 12000 },
        { username: "hamburger", amount: 5500 },
        { username: "nygaard", amount: 3200 },
    ],
    green: [
        { username: "highroller99", amount: 25000 },
    ],
    red: [
        { username: "drietgangsta", amount: 12000 },
        { username: "hamburger", amount: 12000 },
        { username: "xXSlayerXx", amount: 8750 },
    ],
};

type RouletteResult = {
    result: number;
    winnings: number;
    message: string;
};

function randomRoulette(): number {
    return Math.floor(Math.random() * 37);
}

function sumBets(bets: RouletteBetEntry[]): number {
    return bets.reduce((acc, b) => acc + b.amount, 0);
}

export default function Roulette() {
    const [history, setHistory] = useState<number[]>(MOCK_HISTORY);
    const [countdown, setCountdown] = useState(ROUND_DURATION);
    const [frame, setFrame] = useState(137);
    const [bets, setBets] = useState(MOCK_BETS);
    const [amount, setAmount] = useState("");

    // Roller state
    const [spinning, setSpinning] = useState(false);
    const [rollerResult, setRollerResult] = useState<number | null>(null);
    const [displayResult, setDisplayResult] = useState<number | null>(null);

    // Refs
    const countdownRef = useRef(ROUND_DURATION);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
    const rollerResultRef = useRef<number | null>(null);
    const spinningRef = useRef(false);

    const locked = countdown <= LOCK_AT;

    // ── SignalR: opret forbindelse ──────────────────────────────────────────
    useEffect(() => {
        if (connection.state === "Disconnected") {
            connection
                .start()
                .then(() => console.log("Roulette SignalR connected"))
                .catch(console.error);
        }
    }, []);

    // ── SignalR: lyt på runderesultat fra server ───────────────────────────
    useEffect(() => {
        const handler = (data: RouletteResult) => {
            rollerResultRef.current = data.result;
            setRollerResult(data.result);
            console.log("Resultat:", data.result, "Gevinst:", data.winnings);
        };
        connection.on("UpdateClient", handler);
        return () => connection.off("UpdateClient", handler);
    }, []);

    // ── SignalR: lyt på fejl fra server ───────────────────────────────────
    useEffect(() => {
        const handler = (msg: string) => console.error("Server fejl:", msg);
        connection.on("ErrorMessageToClient", handler);
        return () => connection.off("ErrorMessageToClient", handler);
    }, []);

    // ── Lokal nedtælling (fjernes / erstattes af RoundTimer fra server) ───
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (spinningRef.current) return;

            countdownRef.current -= 1;
            setCountdown(countdownRef.current);

            if (countdownRef.current <= 0) {
                // TODO: fjern dette når backend sender resultatet via UpdateClient
                const result = randomRoulette();
                rollerResultRef.current = result;
                spinningRef.current = true;
                setSpinning(true);
                setTimeout(() => setRollerResult(rollerResultRef.current), 4000);
            }
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // ── Kaldes af rolleren når animationen er færdig ───────────────────────
    function handleSpinEnd() {
        const result = rollerResultRef.current;
        if (result === null) return;

        setDisplayResult(result);
        setHistory((h: number[]) => [...h.slice(-19), result]);
        setFrame((f: number) => f + 1);
        setBets({ black: [], green: [], red: [] });

        setTimeout(() => {
            setDisplayResult(null);
            setRollerResult(null);
            rollerResultRef.current = null;
            spinningRef.current = false;
            setSpinning(false);
            countdownRef.current = ROUND_DURATION;
            setCountdown(ROUND_DURATION);
        }, 2000);
    }

    // ── Placer bet ─────────────────────────────────────────────────────────
    function placeBet(color: "black" | "green" | "red") {
        const numeric = Number(amount);
        if (!numeric || numeric <= 0) return;

        setBets((prev: typeof MOCK_BETS) => ({
            ...prev,
            [color]: [...prev[color], { username: "MortenAggerSmækkerLækker", amount: numeric }],
        }));

        // TODO: uncomment når backend er klar
        // connection.invoke("PlayRound", TEMP_USER_ID, numeric, COLOR_TO_INT[color]);

        setAmount("");
    }

    const totalBets = sumBets(bets.black) + sumBets(bets.green) + sumBets(bets.red);

    return (
        <div className="flex flex-col h-full gap-3 p-2">
            {/* Number history */}
            <div className="bg-[#11172c] rounded-xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                <NumberHistory history={history} />
            </div>

            {/* Roller */}
            <div className="bg-[#11172c] rounded-xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                <RouletteRoller
                    spinning={spinning}
                    result={rollerResult}
                    onSpinEnd={handleSpinEnd}
                />
            </div>

            {/* Status bar */}
            <div className="bg-[#11172c] rounded-xl px-6 py-3 flex items-center justify-between shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                <span className="text-[#4a5580] text-sm">Frame {frame}</span>

                <div className="flex flex-col items-center gap-1">
                    {displayResult !== null ? (
                        <span className={`text-xl font-bold tracking-wide
                            ${getRouletteColor(displayResult) === "green" ? "text-green-400" :
                              getRouletteColor(displayResult) === "red" ? "text-red-400" : "text-[#d0d4ff]"}`}>
                            Resultat: {displayResult}
                        </span>
                    ) : spinning ? (
                        <span className="text-base font-bold tracking-widest uppercase text-[#d0d4ff] animate-pulse">
                            RULLER...
                        </span>
                    ) : (
                        <span className={`text-base font-bold tracking-widest uppercase
                            ${locked ? "text-red-400 animate-pulse" : "text-[#d0d4ff]"}`}>
                            {locked
                                ? `LÅST — ${countdown}s`
                                : `RULLER OM ${countdown} sekunder`}
                        </span>
                    )}
                    <div className="w-64 h-1.5 bg-[#1c2340] rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ease-linear
                                ${locked ? "bg-red-500" : "bg-[#00ff88]"}`}
                            style={{ width: `${(countdown / ROUND_DURATION) * 100}%` }}
                        />
                    </div>
                </div>

                <span className="text-[#4a5580] text-sm">
                    Total: <span className="text-[#9cffb0] font-semibold">{formatNumber(totalBets)}</span>
                </span>
            </div>

            {/* Bet amount input */}
            <div className="bg-[#11172c] rounded-xl px-6 py-3 flex items-center gap-3 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                <span className="text-[#9cffb0] font-bold text-lg">$</span>
                <input
                    type="number"
                    placeholder="Beløb"
                    value={amount}
                    disabled={spinning || locked}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (v === "" || Number(v) >= 0) setAmount(v);
                    }}
                    className="flex-1 bg-[#1c2340] text-white placeholder-[#4a5580] rounded-lg px-4 py-2 outline-none border border-transparent focus:border-[#00ff88]/30 transition disabled:opacity-50"
                />
                <div className="flex gap-1 bg-[#0f1528] rounded-lg p-1">
                    <button
                        onClick={() => setAmount((Math.max(0, Number(amount) / 2)).toString())}
                        disabled={spinning || locked}
                        className="text-white text-xs px-3 py-1.5 rounded hover:bg-[#2a3350] transition disabled:opacity-50"
                    >
                        ½
                    </button>
                    <button
                        onClick={() => setAmount((Math.max(0, Number(amount) * 2)).toString())}
                        disabled={spinning || locked}
                        className="text-white text-xs px-3 py-1.5 rounded hover:bg-[#2a3350] transition disabled:opacity-50"
                    >
                        2x
                    </button>
                </div>
            </div>

            {/* Betting columns */}
            <div className="flex gap-4 flex-1 min-h-0">
                <BettingColumn
                    theme="black"
                    label="Sort"
                    bets={bets.black}
                    totalAmount={sumBets(bets.black)}
                    onBet={() => placeBet("black")}
                    disabled={spinning || locked}
                />
                <BettingColumn
                    theme="green"
                    label="0 — Grøn"
                    bets={bets.green}
                    totalAmount={sumBets(bets.green)}
                    onBet={() => placeBet("green")}
                    disabled={spinning || locked}
                />
                <BettingColumn
                    theme="red"
                    label="Rød"
                    bets={bets.red}
                    totalAmount={sumBets(bets.red)}
                    onBet={() => placeBet("red")}
                    disabled={spinning || locked}
                />
            </div>
        </div>
    );
}

export { TEMP_USER_ID, COLOR_TO_INT };
