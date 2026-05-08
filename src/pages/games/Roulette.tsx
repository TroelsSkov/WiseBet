import { useEffect, useRef, useState } from "react";
import NumberHistory from "../../components/games/roulette/NumberHistory";
import RouletteRoller from "../../components/games/roulette/RouletteRoller";
import RouletteStatusBar from "../../components/games/roulette/RouletteStatusBar";
import RouletteBetInput from "../../components/games/roulette/RouletteBetInput";
import BettingColumn from "../../components/games/roulette/BettingColumn";
import { connection } from "../../components/games/roulette/signalr";
import { RouletteSessionStatus, RouletteBetType } from "../../types/games/roulette";
import type { RouletteDto, RouletteBetEntryDto } from "../../types/games/roulette";

const BET_TYPE: Record<"black" | "green" | "red", RouletteBetType> = {
    green: RouletteBetType.Green,
    red: RouletteBetType.Red,
    black: RouletteBetType.Black,
};

type BetsByColor = Record<"black" | "green" | "red", RouletteBetEntryDto[]>;

function groupBets(entries: RouletteBetEntryDto[]): BetsByColor {
    const groups: BetsByColor = { black: [], green: [], red: [] };
    for (const entry of entries) {
        if (entry.betType === RouletteBetType.Black) groups.black.push(entry);
        else if (entry.betType === RouletteBetType.Red) groups.red.push(entry);
        else groups.green.push(entry);
    }
    return groups;
}

function sumBets(entries: RouletteBetEntryDto[]): number {
    return entries.reduce((acc, b) => acc + b.amount, 0);
}

export default function Roulette() {
    const [history, setHistory] = useState<number[]>([]);
    const [countdown, setCountdown] = useState(0);
    const [frame, setFrame] = useState(137);
    const [bets, setBets] = useState<BetsByColor>({ black: [], green: [], red: [] });
    const [amount, setAmount] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [rollerResult, setRollerResult] = useState<number | null>(null);
    const [displayResult, setDisplayResult] = useState<number | null>(null);
    const [status, setStatus] = useState<RouletteSessionStatus>(RouletteSessionStatus.WaitingForPlayers);
    const [connected, setConnected] = useState(false);

    const spinningRef = useRef(false);
    const rollerResultRef = useRef<number | null>(null);

    const locked =
        !connected ||
        spinning ||
        status === RouletteSessionStatus.RoundFinished ||
        countdown <= 5;

    // Connect og join session
    useEffect(() => {
        async function connect() {
            if (connection.state === "Disconnected") {
                try {
                    await connection.start();
                } catch (err) {
                    console.error("SignalR connect failed:", err);
                    return;
                }
            }
            try {
                await connection.invoke("JoinRouletteSession");
            } catch (err) {
                console.error("JoinRouletteSession failed:", err);
            }
        }
        connect();

        return () => {
            if (connection.state === "Connected") {
                connection.invoke("LeaveRouletteSession").catch(console.error);
            }
        };
    }, []);

    // Modtag løbende state fra backend
    useEffect(() => {
        const handler = (dto: RouletteDto) => {
            setConnected(true);
            setStatus(dto.status);
            setBets(groupBets(dto.currentRoundBets));

            // Opdater ikke countdown mens animationen kører — ellers tæller den ned imens hjulet spinner
            if (!spinningRef.current) {
                setCountdown(dto.secondsLeft);
            }

            // Backenden sender aldrig Spinning som stabil tilstand — trigger på RoundFinished
            if (
                dto.status === RouletteSessionStatus.RoundFinished &&
                dto.winningNumber !== null &&
                !spinningRef.current
            ) {
                const winningNumber = dto.winningNumber;
                spinningRef.current = true;
                rollerResultRef.current = winningNumber;
                setSpinning(true); // Phase 1: hurtig spin (result=null)
                setTimeout(() => {
                    setRollerResult(winningNumber); // Phase 2: decelerer til vindertal
                }, 2000);
            }
        };
        connection.on("UpdateClient", handler);
        return () => connection.off("UpdateClient", handler);
    }, []);

    useEffect(() => {
        const handler = (msg: string) => console.error("Server fejl:", msg);
        connection.on("ErrorMessageToClient", handler);
        return () => connection.off("ErrorMessageToClient", handler);
    }, []);

    function handleSpinEnd() {
        const result = rollerResultRef.current;
        if (result !== null) {
            setDisplayResult(result);
            setHistory((h) => [...h.slice(-19), result]);
            setFrame((f) => f + 1);
        }

        setTimeout(() => {
            setDisplayResult(null);
            setRollerResult(null);
            rollerResultRef.current = null;
            spinningRef.current = false;
            setSpinning(false);
        }, 2000);
    }

    function placeBet(color: "black" | "green" | "red") {
        const numeric = Number(amount);
        if (!numeric || numeric <= 0) return;
        connection.invoke("PlaceRouletteBet", { amount: numeric, betType: BET_TYPE[color] }).catch(console.error);
        setAmount("");
    }

    const totalBets = sumBets(bets.black) + sumBets(bets.green) + sumBets(bets.red);

    return (
        <div className="flex flex-col h-full gap-3 p-2">

            <div className="bg-[#11172c] rounded-xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                <NumberHistory history={history} />
            </div>

            <div className="bg-[#11172c] rounded-xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                <RouletteRoller spinning={spinning} result={rollerResult} onSpinEnd={handleSpinEnd} />
            </div>

            <RouletteStatusBar
                displayResult={displayResult}
                spinning={spinning}
                locked={locked}
                connected={connected}
                countdown={countdown}
                totalBets={totalBets}
                frame={frame}
                roundDuration={30}
            />

            <RouletteBetInput
                amount={amount}
                onChange={setAmount}
                disabled={spinning || locked}
            />

            <div className="flex gap-4 flex-1 min-h-0">
                <BettingColumn theme="black" label="Sort" bets={bets.black} totalAmount={sumBets(bets.black)} onBet={() => placeBet("black")} disabled={spinning || locked} />
                <BettingColumn theme="green" label="0 — Grøn" bets={bets.green} totalAmount={sumBets(bets.green)} onBet={() => placeBet("green")} disabled={spinning || locked} />
                <BettingColumn theme="red" label="Rød" bets={bets.red} totalAmount={sumBets(bets.red)} onBet={() => placeBet("red")} disabled={spinning || locked} />
            </div>

        </div>
    );
}
