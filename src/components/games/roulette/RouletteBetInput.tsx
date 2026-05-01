type Props = {
    amount: string;
    onChange: (value: string) => void;
    disabled: boolean;
};

export default function RouletteBetInput({ amount, onChange, disabled }: Props) {
    return (
        <div className="bg-[#11172c] rounded-xl px-6 py-3 flex items-center gap-3 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">

            <span className="text-[#9cffb0] font-bold text-lg">$</span>

            {/* Beløb input */}
            <input
                type="number"
                placeholder="Beløb"
                value={amount}
                disabled={disabled}
                onChange={(e) => {
                    const v = e.target.value;
                    if (v === "" || Number(v) >= 0) onChange(v);
                }}
                className="flex-1 bg-[#1c2340] text-white placeholder-[#4a5580] rounded-lg px-4 py-2 outline-none border border-transparent focus:border-[#00ff88]/30 transition disabled:opacity-50"
            />

            {/* ½ og 2x knapper */}
            <div className="flex gap-1 bg-[#0f1528] rounded-lg p-1">
                <button
                    onClick={() => onChange(Math.max(0, Number(amount) / 2).toString())}
                    disabled={disabled}
                    className="text-white text-xs px-3 py-1.5 rounded hover:bg-[#2a3350] transition disabled:opacity-50"
                >
                    ½
                </button>
                <button
                    onClick={() => onChange(Math.max(0, Number(amount) * 2).toString())}
                    disabled={disabled}
                    className="text-white text-xs px-3 py-1.5 rounded hover:bg-[#2a3350] transition disabled:opacity-50"
                >
                    2x
                </button>
            </div>

        </div>
    );
}
