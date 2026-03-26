import { useEffect, useState } from "react";

type BetData = {
    amount: number;
    choice: "W" | "C";
};

type Props = {
    betData: BetData | null;
    shouldFlip: boolean;
    onFlipped: () => void;
};

const playRound = async (amount: number, choice: "W" | "C") => {
    const res = await fetch("http://localhost:3001/api/play-round", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, choice }),
    });

    return await res.json();
};


export default function Coin({ betData, shouldFlip, onFlipped }: Props) {
    const [rotation, setRotation] = useState(0);
    const [flipping, setFlipping] = useState(false);

    useEffect(() => {
        if (!shouldFlip || flipping || !betData) return;


        const run = async () => {
            setFlipping(true);

            try {
                const { result, winnings } = await playRound(
                    betData.amount,
                    betData.choice
                );

                const spins = 17;
                const final = result === "W" ? 0 : 180; //front (W)=0, back (B)=180

                // setRotation((prev) => prev + spins * 360 + final + 360);
                setRotation((prev) => {
                    const normalized = prev % 360; // 0 eller 180
                    const spins = 17;
                    const final = result === "W" ? 0 : 180;

                    return prev + spins * 360 + (final - normalized);
                });

                console.log("Result:", result);
                console.log("Win:", winnings);


            } catch (err) {
                console.error("Api fejl", err);
                setFlipping(false);
            }
        };
        run();

    }, [shouldFlip, betData, flipping]);

    
    return (
  <div className="flex justify-center items-center mt-10">
    <div
      className="w-[400px] h-[400px] relative [transform-style:preserve-3d] transition-transform duration-[7000ms] ease-out"
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