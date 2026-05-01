import { getRouletteColor } from "./NumberHistory";
import { formatNumber } from "../../../utils/formatNumber";

type Props = {
    displayResult: number | null;
    spinning: boolean;
    locked: boolean;
    countdown: number;
    totalBets: number;
    frame: number;
    roundDuration: number;
};

export default function RouletteStatusBar({ displayResult, spinning, locked, countdown, totalBets, frame, roundDuration }: Props) {
    return (
        <div className="bg-[#11172c] rounded-xl px-6 py-3 flex items-center justify-between shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">

            {/* Frame tæller */}
            <span className="text-[#4a5580] text-sm">Frame {frame}</span>

            {/* Status tekst + progressbar */}
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
                        {locked ? `LÅST — ${countdown}s` : `RULLER OM ${countdown} sekunder`}
                    </span>
                )}
                <div className="w-64 h-1.5 bg-[#1c2340] rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-linear ${locked ? "bg-red-500" : "bg-[#00ff88]"}`}
                        style={{ width: `${(countdown / roundDuration) * 100}%` }}
                    />
                </div>
            </div>

            {/* Total indsats */}
            <span className="text-[#4a5580] text-sm">
                Total: <span className="text-[#9cffb0] font-semibold">{formatNumber(totalBets)}</span>
            </span>

        </div>
    );
}
