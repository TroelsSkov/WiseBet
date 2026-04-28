import { useState } from "react";
import { connection } from "../../components/games/signalr";
import ControlPanel from "../../components/games/blackjack/ControlPanel";
import CardPanel from "../../components/games/blackjack/CardPanel";
import type { BlackjackGameRequest } from "../../types/games/blackjack";

  const UserId = "87A5B8DB-AFE1-4935-84E1-4F5905A805A1";


export default function Blackjack() {
  const [betData, setBetData] =
    useState<BlackjackGameRequest | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  return (
    <div className="h-screen bg-[#0b0f1a] flex items-center justify-between px-32">
      <ControlPanel
        onBet={(data) => {
          setBetData(data);
          setShouldPlay(true);
        }}
        
        onHit={() => connection.invoke("HitBlackjack",UserId)}
        onStand={() => connection.invoke("StandBlackjack",UserId)}
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