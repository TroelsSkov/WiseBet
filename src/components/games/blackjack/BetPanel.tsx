import { useState } from "react";
import Input from "../../form/Input";
import type { BlackjackGameRequest } from "../../../types/games/blackjack";

type Props = {
  onBet: (data: BlackjackGameRequest) => void;
  disabled: boolean;
};

export default function BetPanel({ onBet, disabled }: Props) {
  const [amount, setAmount] = useState("");

  const numericAmount = Number(amount);
  const isValid = Number.isFinite(numericAmount) && numericAmount > 0;

  return (
    <div className="bg-[#1c2340] p-5 rounded-xl shadow">
      <div className="flex items-center bg-[#11172c] p-2 rounded-lg gap-2 mb-4">
        <span className="text-[#9cffb0] font-bold">$</span>

        <Input
          type="number"
          placeholder="Indtast beløb"
          value={amount}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "" || Number(v) >= 0) setAmount(v);
          }}
        />

        <button
          disabled={disabled}
          onClick={() => setAmount((numericAmount / 2 || 0).toString())}
          className="px-2 text-white bg-[#2a3350] rounded"
        >
          ½
        </button>

        <button
          disabled={disabled}
          onClick={() => setAmount((numericAmount * 2 || 0).toString())}
          className="px-2 text-white bg-[#2a3350] rounded"
        >
          2x
        </button>
      </div>

      <button
        disabled={disabled || !isValid}
        onClick={() => onBet({ amount: numericAmount })}
        className="w-full py-3 bg-[#00a83e] text-white font-bold rounded-lg disabled:bg-[#2f3a55]"
      >
        Placer bet
      </button>
    </div>
  );
}
``