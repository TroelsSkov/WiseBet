import { useState } from "react";
import { connection } from "../../components/games/signalr";
import ControlPanel from "../../components/games/blackjack/ControlPanel";
import CardPanel from "../../components/games/blackjack/CardPanel";
import type { BlackjackGameRequest } from "../../types/games/blackjack";

// const UserId = "94FC84F5-295C-45C9-9128-E28214818B1F";


export default function Blackjack() {
  const [betData, setBetData] =
    useState<BlackjackGameRequest | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const option = useState<string>("stand");

  connection.off("NextAction");
  connection.on("NextAction", ((): any => {
    console.log("Was here");
    return "stand";
  }) as any);

  return (
    <div className="h-screen bg-[#0b0f1a] flex items-center justify-between px-30">
      <ControlPanel
        onBet={(data) => {
          setBetData(data);
          setShouldPlay(true);
        }}

        onHit={() => connection.invoke("HitBlackjack")}
        onStand={() => connection.invoke("StandBlackjack")}
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