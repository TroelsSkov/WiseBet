import { useState } from "react";
import BetPanel from "../../components/games/coinflip/BetPanel";
import Coin from "../../components/games/coinflip/CoinPanel.tsx";
import type { CoinflipGameRequest } from "../../types/games/coinflip";

function Coinflip() {
  const [betData, setBetData] = useState<CoinflipGameRequest | null>(null);
  const [shouldFlip, setShouldFlip] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen scale-100">
        <div className="flex items-center gap-20">

          <BetPanel
            onBet={(data: CoinflipGameRequest) => {
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
