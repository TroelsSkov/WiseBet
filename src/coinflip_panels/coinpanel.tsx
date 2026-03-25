import { useEffect, useState } from "react";
import "./coinpanel.css";

type BetData = {
  amount: number;
  choice: "plat" | "krone";
};

type Props = {
  betData: BetData | null;
  shouldFlip: boolean;
  onFlipped: () => void;
};

export default function Coin({ betData, shouldFlip, onFlipped }: Props) {
  const [rotation, setRotation] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (!shouldFlip || flipping || !betData) return;

    setFlipping(true);

    const result = Math.random() > 0.5 ? "plat" : "krone";
    const spins = 17;
    const final = result === "plat" ? 0 : 180; //front (W)=0, back (B)=180

    setRotation((prev) => prev + spins * 360 + final);

    // (klar til senere: win/lose)
    // const didWin = result === betData.choice;
    // console.log("Result:", result, "You chose:", betData.choice, "Win:", didWin);

  }, [shouldFlip, betData, flipping]);

  return (
    <div className="coinContainer">
      <div
        className="coin"
        style={{ transform: `rotateY(${rotation}deg)` }}
        onTransitionEnd={() => {
          setFlipping(false);
          onFlipped();
        }}
      >
        <div className="side front">W</div>
        <div className="side back">B</div>
      </div>
    </div>
  );
}