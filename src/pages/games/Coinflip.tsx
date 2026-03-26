import { useState } from "react";
import BetPanel from "../../components/games/coinflip/betpanel";
import Coin from "../../components/games/coinflip/coinpanel";

type BetData = {
  amount: number;
  choice: "W" | "B";
};

function Coinflip() {
  const [betData, setBetData] = useState<BetData | null>(null);
  const [shouldFlip, setShouldFlip] = useState(false);

  return (
    <>
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
    </>
  )
}

export default Coinflip
