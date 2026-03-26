import { useState } from "react";
import BetPanel from "../../components/games/coinflip/betpanel";
import Coin from "../../components/games/coinflip/coinpanel";

type BetData = {
  amount: number;
  choice: "W" | "C";
};

function Coinflip() {
  const [betData, setBetData] = useState<BetData | null>(null);
  const [shouldFlip, setShouldFlip] = useState(false);

  return (
    <>
    <div className="flex justify-center items-center w-full h-screen scale-100">
    <div className="flex items-center gap-10">

      <BetPanel
        onBet={(data) => {
          setBetData(data);
          setShouldFlip(true)
        }}
        disabled={shouldFlip}
        />

      <Coin 
        betData={betData}
        shouldFlip={shouldFlip}
        onFlipped={() => setShouldFlip(false)}
        />
        </div>
        </div>
    </>
  )
}

export default Coinflip
