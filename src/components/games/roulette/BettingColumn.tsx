import type { RouletteBetEntryDto } from "../../../types/games/roulette";
import { formatNumber } from "../../../utils/formatNumber";

type ColorTheme = "black" | "green" | "red";

type Props = {
    theme: ColorTheme;
    label: string;
    bets: RouletteBetEntryDto[];
    totalAmount: number;
    onBet: () => void;
    disabled: boolean;
};

const themeStyles: Record<ColorTheme, { header: string; button: string; glow: string }> = {
    black: {
        header: "bg-[#0f1528] border-[rgba(255,255,255,0.1)]",
        button: "bg-[#2a3350] hover:bg-[#3a4460]",
        glow: "",
    },
    green: {
        header: "bg-green-900/40 border-green-700/40",
        button: "bg-green-600 hover:bg-green-500",
        glow: "shadow-[0_0_12px_rgba(22,163,74,0.25)]",
    },
    red: {
        header: "bg-red-900/40 border-red-700/40",
        button: "bg-red-600 hover:bg-red-500",
        glow: "shadow-[0_0_12px_rgba(220,38,38,0.25)]",
    },
};

export default function BettingColumn({ theme, label, bets, totalAmount, onBet, disabled }: Props) {
    const styles = themeStyles[theme];

    return (
        <div className={`flex-1 flex flex-col rounded-xl border bg-[#11172c] overflow-hidden ${styles.header} ${styles.glow}`}>
            {/* Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${styles.header}`}>
                <span className="text-sm font-semibold text-[#d0d4ff] uppercase tracking-wider">{label}</span>
                <span className="text-sm text-[#9cffb0] font-bold">{formatNumber(totalAmount)}</span>
            </div>

            {/* Place Bet button */}
            <div className="px-4 py-3">
                <button
                    onClick={onBet}
                    disabled={disabled}
                    className={`w-full py-2.5 rounded-lg text-white font-bold text-sm transition-all duration-200 cursor-pointer
                        ${styles.button}
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Place Bet
                </button>
            </div>

            {/* Bet list */}
            <div className="flex-1 overflow-y-auto px-4 pb-3 flex flex-col gap-2 max-h-[260px]">
                {bets.length === 0 && (
                    <p className="text-[#4a5580] text-xs text-center mt-4">Ingen bets endnu</p>
                )}
                {bets.map((bet, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#1c2340] rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#2a3350] flex items-center justify-center text-xs text-[#d0d4ff] font-bold shrink-0">
                                {bet.username[0].toUpperCase()}
                            </div>
                            <span className="text-[#d0d4ff] text-sm truncate max-w-[90px]">@{bet.username}</span>
                        </div>
                        <span className="text-[#9cffb0] text-sm font-semibold shrink-0">{formatNumber(bet.amount)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
