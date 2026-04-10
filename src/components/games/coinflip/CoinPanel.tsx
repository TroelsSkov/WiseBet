import { useEffect, useState } from "react";
import { connection } from "./signalr";

type BetData = {
  amount: number;
  choice: "W" | "C";
};

type Props = {
  betData: BetData | null;
  shouldFlip: boolean;
  onFlipped: () => void;
};

const userId = "00000000-0000-0000-0000-000000000001";

type CoinFlipResult = {
  landingSide: "Wise" | "Coin";
  winnings: number;
  message: string;
};


export default function Coin({ betData, shouldFlip, onFlipped }: Props) {
  const [rotation, setRotation] = useState(0);
  const [flipping, setFlipping] = useState(false);

    useEffect(() => {
    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!shouldFlip || flipping || !betData) return;

    setFlipping(true);

      connection.invoke(
    "PlayRound",
    userId,
    betData.amount,
    betData.choice === "W" ? "Wise" : "Coin"
   );

  }, [shouldFlip, betData, flipping]);

  useEffect(() => {
    const handleResult = (data: CoinFlipResult) => {
      const resultMapped: "W" | "C" = data.landingSide === "Wise" ? "W" : "C";

      const win = betData?.choice === resultMapped;

      setRotation((prev) => {
        const normalized = prev % 360;
        const spins = 17;
        const final = resultMapped === "W" ? 0 : 180;

        return prev + spins * 360 + (final - normalized);
      });

      console.log("Result:", resultMapped);
      console.log("Win:", win);
      console.log("Winnings:", data.winnings);
      console.log("Message", data.message);
    };

    connection.on("UpdateClient", handleResult);

    return () => {
      connection.off("UpdateClient", handleResult);
    };
  }, [betData]);

    useEffect(() => {
    const errorHandler = (msg: string) => {
      console.error("Server error:", msg);
      setFlipping(false);
    };

    connection.on("ErrorMessageToClient", errorHandler);

    return () => {
      connection.off("ErrorMessageToClient", errorHandler);
    };
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <div
        className="w-[500px] h-[500px] relative [transform-style:preserve-3d] transition-transform duration-[7000ms] ease-out"
        style={{ transform: `rotateY(${rotation}deg)` }}
        onTransitionEnd={() => {
          setFlipping(false);
          onFlipped();
        }}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full flex items-center justify-center text-[250px] font-bold rounded-full text-gray-400 [backface-visibility:hidden] bg-[radial-gradient(circle,#ffd700,#c89b00)]">
          W
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full flex items-center justify-center text-[250px] font-bold rounded-full text-gray-400 [backface-visibility:hidden] bg-[radial-gradient(circle,#ffd700,#c89b00)] [transform:rotateY(180deg)]">
          C
        </div>
      </div>
    </div>
  );
}