const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export function getRouletteColor(n: number): "green" | "red" | "black" {
    if (n === 0) return "green";
    return RED_NUMBERS.has(n) ? "red" : "black";
}

type Props = {
    history: number[];
};

export default function NumberHistory({ history }: Props) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-1">
            {history.map((num, i) => {
                const color = getRouletteColor(num);
                return (
                    <div
                        key={i}
                        className={`min-w-[52px] h-[52px] rounded-lg flex items-center justify-center text-xl font-bold text-white shrink-0 transition-all duration-300
                            ${color === "green"
                                ? "bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]"
                                : color === "red"
                                ? "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]"
                                : "bg-[#1c2340] border border-[rgba(255,255,255,0.08)]"
                            }`}
                    >
                        {num}
                    </div>
                );
            })}
        </div>
    );
}
