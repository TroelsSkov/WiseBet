import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { connection } from "../signalr";
import { getCardImage, CARD_BACK_IMAGE } from "../../../assets/utils/cardImage";
import type {
  BlackjackGameRequest,
  BlackjackGameResponse,
  Card,
} from "../../../types/games/blackjack";
import PlayTimeCounter from "../../navbar/PlayTimeCounter";

// const USER_ID = "94FC84F5-295C-45C9-9128-E28214818B1F";


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


function Hand({
  title,
  cards,
  score,
  isDealer = false,
  gameFinished = false
}: {
  title: string;
  score: number;
  cards: Card[];
  isDealer?: boolean;
  gameFinished?: boolean;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-white mb-3">{title}{score}</h3>

      <div className="flex gap-3">
        {cards.map((card, i) => {
          // Show card back for dealer's second card (hole card) - only when game is still playing
          const isHoleCard = isDealer && i === 1 && !gameFinished;
          const cardImage = isHoleCard ? CARD_BACK_IMAGE : getCardImage(card);

          return (
            <div
              key={i}
              className="card-flip"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <img
                src={cardImage}
                alt={isHoleCard ? "Card" : "Card Back"}
                width={130}
                height={130}
                className="rounded-lg bg-white object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CardPanel({ betData, shouldPlay, onGameEnd }: Props) {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [dealerFullHand, setDealerFullHand] = useState<Card[]>([]);
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
    connection.invoke("StartRoundBlackjack", betData.amount);
  }, [shouldPlay, betData]);

  async function updatehand(hand: Card[], setHand: Dispatch<SetStateAction<Card[]>>) {
    let delay = 0;
    setHand([]);
    for (let card in hand) {
      console.log(hand[card])
      setTimeout(() => {
        console.log("Den bliver indsat nu: " + JSON.stringify(hand[card] + " " + delay))
        setHand(prev => [...prev, hand[card]]);
      }, delay);
      delay += 300;
    }
  }

  useEffect(() => {
    const handler = (data: BlackjackGameResponse) => {
      console.log("UpdateClient modtaget:", data);
      if (playerHand.length == 0)
        updatehand(data.playerHand, setPlayerHand);
      else
        setPlayerHand(data.playerHand)

      // setDealerHand(data.dealerVisibleHand)

      // Build full dealer hand - visible cards + one hidden card (if only 1 visible)
      const fullHand = [...data.dealerVisibleHand];

      // Always add a placeholder for the hole card if we only have 1 visible card
      if (data.dealerVisibleHand.length === 1) {
        // Add a placeholder card for the hole card (will show as card back when playing)
        fullHand.push({ rank: 0, suit: 0 }); // Placeholder - shows card back when playing
      }
      if (fullHand.length == 2)
        updatehand(fullHand, setDealerFullHand);
      else {
        setDealerFullHand([])
        updatehand(fullHand, setDealerFullHand);
      }

      // setDealerFullHand(fullHand);
      setStatus(data.status);
      setDealerScore(data.dealerScore);
      setPlayerScore(data.playerScore);

      if (data.status !== 0) {
        setTimeout(onGameEnd, 1000);
      }
    };

    connection.on("UpdateClient", handler);
    return () => connection.off("UpdateClient", handler);
  }, [onGameEnd, playerHand]);

  return (
    <div style={{ padding: "30px" }}>
      <Hand
        title="Dealer: "
        score={dealerScore}
        cards={dealerFullHand.length > 0 ? dealerFullHand : dealerHand}
        isDealer={true}
        gameFinished={status !== 0 && status !== null}
      />
      <Hand
        title="Player: "
        score={playerScore}
        cards={playerHand}
      />
      {status !== null && (

        <div

          style={{
            marginTop: "5px",
            fontSize: "50px",
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