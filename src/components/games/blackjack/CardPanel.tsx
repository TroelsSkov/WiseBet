import { useEffect, useState } from "react";
import { connection } from "../signalr";
import { getCardImage } from "../../../assets/utils/cardImage";
import type {
  BlackjackGameRequest,
  BlackjackGameResponse,
  Card,
} from "../../../types/games/blackjack";

const USER_ID = "E856CDC4-B1CF-422C-A586-8AFCE9DAD82F";

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
            width={90}
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
        <div style={{ color: "white", marginTop: "20px" }}>
          {status}
        </div>
      )}
    </div>
  );
}
``