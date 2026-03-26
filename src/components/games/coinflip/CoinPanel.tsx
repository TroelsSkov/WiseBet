import { useEffect, useState } from "react";
import "../../../coinpanel.css";

type BetData = {
    amount: number;
    choice: "W" | "B";
};

type Props = {
    betData: BetData | null;
    shouldFlip: boolean;
    onFlipped: () => void;
};

const playRound = async (amount: number, choice: "W" | "B") => {
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