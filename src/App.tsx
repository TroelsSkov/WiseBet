import { useState } from 'react'
import BetPanel from './coinflip_panels/betpanel'
import CoinPanel from './coinflip_panels/coinpanel'

import './App.css'

type BetData = {
  amount: number;
  choice: "plat" | "krone";
};

function App() {
  const [betData, setBetData] = useState<BetData | null>(null);
  const [shouldFlip, setShouldFlip] = useState(false);

  return (
    <div className='container'>
      <BetPanel
        onBet={(data) => {
          setBetData(data);
          setShouldFlip(true);
        }}
        disabled={shouldFlip}
      />

      <CoinPanel
        betData={betData}
        shouldFlip={shouldFlip}
        onFlipped={() => setShouldFlip(false)}
      />
    </div>
  );
}

export default App;