import { useState } from "react";

type Props = {
  onBet: (data: { amount: number; choice: "W" | "B" }) => void;
  disabled: boolean;
};

export default function BetPanel({ onBet, disabled }: Props) {
  const [amount, setAmount] = useState(1);
  const [choice, setChoice] = useState<"W" | "B">("W");

  return (
    <div className="panel">
      <div className="inputRow">
        <span className="currency">$</span>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="multiplier">
          <button onClick={() => setAmount(amount / 2)}>½</button>
          <button onClick={() => setAmount(amount * 2)}>2x</button>
        </div>
      </div>

      <div className="choiceRow">
        <div
          className={`choiceBox ${choice === "W" ? "active" : ""}`}
          onClick={() => setChoice("W")}
        >
          W
        </div>

        <div
          className={`choiceBox ${choice === "B" ? "active" : ""}`}
          onClick={() => setChoice("B")}
        >
          B
        </div>
      </div>

      <button className="betBtn" onClick={() => onBet({ amount, choice })} disabled={disabled}>
        Placer bet
      </button>
    </div>
  );
}