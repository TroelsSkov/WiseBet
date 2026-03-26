import { useState } from "react";

type Props = {
  onBet: (data: { amount: number; choice: "W" | "C" }) => void;
  disabled: boolean;
};

export default function BetPanel({ onBet, disabled }: Props) {
  const [amount, setAmount] = useState("");
  const [choice, setChoice] = useState<"W" | "C">("W");

  return (
    <div className="bg-[#1c2340] p-5 rounded-xl w-[260px] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">

      {/* INPUT */}
      <div className="flex items-center bg-[#11172c] p-2.5 rounded-lg mb-5 gap-2.5">
        <span className="text-[#9cffb0] font-bold">$</span>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") {
              setAmount("");
              return;
            }

            if (Number(value) < 0) return;

            setAmount(value);
          }}
          className="flex-1 bg-transparent text-white outline-none [appearance:textfield]"
        />

        <div className="flex gap-1.5">
          <button
            onClick={() => {
              const numeric = Number(amount) || 0;
              const newValue = Math.max(0, numeric / 2);
              setAmount(newValue.toString());
            }}
            className="bg-[#2a3350] text-white px-2.5 py-1.5 rounded cursor-pointer"
          >
            ½
          </button>

          <button
            onClick={() => {
              const numeric = Number(amount) || 0;
              const newValue = Math.max(0, numeric * 2);
              setAmount(newValue.toString());
            }}
            className="bg-[#2a3350] text-white px-2.5 py-1.5 rounded cursor-pointer"
          >
            2x
          </button>
        </div>
      </div>

      {/* CHOICE */}
      <div className="flex gap-4 mb-5">
        <div
          onClick={() => !disabled && setChoice("W")}
          className={`flex-1 h-[100px] bg-[#2a3350] rounded-xl flex items-center justify-center text-[42px] font-bold text-[#d0d4ff] cursor-pointer border-2 transition-all duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]"}
            ${choice === "W"
              ? "border-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.3)]"
              : "border-transparent"}
          hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]`}
        >
          W
        </div>

        <div
          onClick={() => !disabled && setChoice("C")}
          className={`flex-1 h-[100px] bg-[#2a3350] rounded-xl flex items-center justify-center text-[42px] font-bold text-[#d0d4ff] cursor-pointer border-2 transition-all duration-200
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]"}
            ${choice === "C"
              ? "border-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.3)]"
              : "border-transparent"}
          hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]`}
        >
          C
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => onBet({ amount: Number(amount), choice })}
        disabled={disabled}
        className="w-full py-3.5 bg-[#00a83e] rounded-lg text-white font-bold text-base cursor-pointer transition
        hover:bg-[#00c94a]
        disabled:bg-[#2f3a55] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Placer bet
      </button>
    </div>
  );
}