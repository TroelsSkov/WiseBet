import { useEffect, useState } from "react";
import { connection } from "../signalr";
import { getCardImage } from "../../../assets/utils/cardImage";
import type {
  BlackjackGameRequest,
  BlackjackGameResponse,
  Card,
} from "../../../types/games/blackjack";

const USER_ID = "CFE0AED7-AFC7-40B6-B111-762D052EB1DE";


const statusText: Record<number, string> = {
  0: "Playing",
  1: "Player bust",
  2: "Dealer bust",
  3: "Player wins",
  4: "Dealer wins",
  5: "Push",
};

type Props = {
  betData: BlackjackGameRequest | null;
  shouldPlay: boolean;
  onGameEnd: () => void;
};

function Hand({ title, cards, score }: { title: string; score: number; cards: Card[] }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h3 style={{ color: "white", marginBottom: "12px" }}>{title}{score}</h3>

      <div style={{ display: "flex", gap: "12px" }}>
        {cards.map((card, i) => (
          <img
            key={i}
            src={getCardImage(card)}
            alt="Card"
            width={130}
            height={130}
            style={{
              background: "white",
              borderRadius: "8px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CardPanel({ betData, shouldPlay, onGameEnd }: Props) {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [status, setStatus] =
    useState<BlackjackGameResponse["status"] | null>(null);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [playerScore, setPlayerScore] = useState<number>(0);

  useEffect(() => {
    if (connection.state === "Disconnected") {
      connection.start();
    }
  }, []);

  useEffect(() => {
    if (!shouldPlay || !betData) return;
    connection.invoke("StartRoundBlackjack", USER_ID, betData.amount);
  }, [shouldPlay, betData]);

  useEffect(() => {
    const handler = (data: BlackjackGameResponse) => {
      console.log("UpdateClient modtaget:", data);
      setPlayerHand(data.playerHand);
      setDealerHand(data.dealerVisibleHand);
      setStatus(data.status);
      setDealerScore(data.dealerScore);
      setPlayerScore(data.playerScore);


      if (data.status !== 0) {
        setTimeout(onGameEnd, 2000);
      }
    };

    connection.on("UpdateClient", handler);
    return () => connection.off("UpdateClient", handler);
  }, [onGameEnd]);

  return (
    <div style={{ padding: "40px" }}>
      <Hand title="Dealer: " score={dealerScore} cards={dealerHand} />
      <Hand title="Player: " score={playerScore}  cards={playerHand} />

      {status && (
        
<div
    
style={{
      marginTop: "20px",
      fontSize: "22px",
      fontWeight: "bold",
      color:
        status === 1 ? "#ff0000" :      // Player bust
        status === 2 ? "#4ade80" :      // Dealer bust (player vinder)
        status === 3 ? "#4ade80" :      // Player wins
        status === 4 ? "#ff0000" :      // Dealer wins
        status === 5 ? "#eab308" :      // Push
        status === 0 ? "white" : 
        "white",
        
}}
  >

    {statusText[status]}
  </div>

      )}
    </div>
  );
}
``