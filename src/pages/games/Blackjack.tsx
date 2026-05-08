import { useState } from "react";
import { connection } from "../../components/games/signalr";
import ControlPanel from "../../components/games/blackjack/ControlPanel";
import CardPanel from "../../components/games/blackjack/CardPanel";
import type { BlackjackGameRequest } from "../../types/games/blackjack";
import { triggerSaldoEvent } from "../../services/globalEvents";

// const UserId = "94FC84F5-295C-45C9-9128-E28214818B1F";


export default function Blackjack() {
  const [betData, setBetData] =
    useState<BlackjackGameRequest | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  let answer: ((value: string) => void) | null = null;

  const event = () => {
    triggerSaldoEvent('saldo-event', {});
  }

  function onUserActionDecided(NextAction: string) {
    if (answer) {
      answer(NextAction)
      answer = null;
    }
  }

  connection.off("NextAction");
  connection.on("NextAction", (async (): Promise<any> => {

    const promise = new Promise<string>((resolve) => {
      answer = resolve;
    })

    const userAction = await promise;
    console.log("[NextAction] User action has been recieved")

    return userAction;
  }) as any);

  return (
    <div className="h-screen bg-[#0b0f1a] flex items-center justify-between px-30">
      <ControlPanel
        onBet={(data) => {
          setBetData(data);
          setShouldPlay(true);
        }}

        onHit={() => onUserActionDecided("hit")}
        onStand={() => onUserActionDecided("stand")}
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