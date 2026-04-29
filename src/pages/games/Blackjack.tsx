import { useState } from "react";
import { connection } from "../../components/games/signalr";
import ControlPanel from "../../components/games/blackjack/ControlPanel";
import CardPanel from "../../components/games/blackjack/CardPanel";
import type { BlackjackGameRequest } from "../../types/games/blackjack";

const UserId = "CFE0AED7-AFC7-40B6-B111-762D052EB1DE";


export default function Blackjack() {
  const [betData, setBetData] =
  useState<BlackjackGameRequest | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  

  return (
    <div className="h-screen bg-[#0b0f1a] flex items-center justify-between px-30">
      <ControlPanel
        onBet={(data) => {
          setBetData(data);
          setShouldPlay(true);
        }}

        onHit={() => connection.invoke("HitBlackjack", UserId)}
        onStand={() => connection.invoke("StandBlackjack", UserId)}
        betDisabled={shouldPlay}
        canAct={shouldPlay}
      />

      <CardPanel
        betData={betData}
        shouldPlay={shouldPlay}
        onGameEnd={() => setShouldPlay(false)}
      />
    </div>

  );
}