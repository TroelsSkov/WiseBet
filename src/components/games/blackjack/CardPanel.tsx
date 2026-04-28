import { useEffect, useState } from "react";
import { connection } from "../signalr";
import { getCardImage } from "../../../assets/utils/cardImage";
import type {
  BlackjackGameRequest,
  BlackjackGameResponse,
  Card,
} from "../../../types/games/blackjack";

const USER_ID = "87A5B8DB-AFE1-4935-84E1-4F5905A805A1";

type Props = {
  betData: BlackjackGameRequest | null;
  shouldPlay: boolean;
  onGameEnd: () => void;
};

function Hand({ title, cards }: { title: string; cards: Card[] }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h3 style={{ color: "white", marginBottom: "12px" }}>{title}</h3>

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
      setPlayerHand(data.playerHand);
      setDealerHand(data.dealerVisibleHand);
      setStatus(data.status);

      if (data.status !== "Playing") {
        setTimeout(onGameEnd, 2000);
      }
    };

    connection.on("UpdateClient", handler);
    return () => connection.off("UpdateClient", handler);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <Hand title="Dealer" cards={dealerHand} />
      <Hand title="Player" cards={playerHand} />

      {status && (
        <div style={{ color: "white", marginTop: "20px" }}>
          {status}
        </div>
      )}
    </div>
  );
}
``