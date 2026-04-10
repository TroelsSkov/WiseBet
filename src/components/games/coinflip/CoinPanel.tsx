import { useEffect, useRef, useState } from "react";
import { connection } from "./signalr";
import { useUser } from "../../../context/UserContext";


type BetData = {
  amount: number;
  choice: "W" | "C"; //limits choices to take
};

type Props = {
  betData: BetData | null;
  shouldFlip: boolean;
  onFlipped: () => void;
};


// const userId = "00000000-0000-0000-0000-000000000001"; //temporary. fake userId

type CoinFlipResult = {
  landingSide: "Wise" | "Coin";
  winnings: number;
  message: string;
};


export default function Coin({ betData, shouldFlip, onFlipped }: Props) {
  const [rotation, setRotation] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [currentChoice, setCurrentChoice] = useState<"W" | "C" | null>(null);
  const user = useUser();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  /**
   * useeffect will start at first render of the screen. it triggers automatically instead of needing to keep an eye on it ourselves.
   */
    useEffect(() => {
      if(connection.state === "Disconnected"){
    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch(console.error);
      }
  }, []);

/**
 * this useeffect is triggered when either, shouldFlip, betData or flipping has a changed state
 */
  useEffect(() => {
    if (!shouldFlip || flipping || !betData || !user) return; //if not all states is changed the useeffect will just return

    setFlipping(true); //locking the flip, so the coin only flips once
    setCurrentChoice(betData.choice);

    connection.invoke( //invoke sends message to the server
    "PlayRound",
    user.id,
    betData.amount,
    betData.choice === "W" ? "Wise" : "Coin"
   );
   timeoutRef.current = setTimeout(() => { onFlipped(); setFlipping(false); setCurrentChoice(null); }, 8000);

  }, [shouldFlip, betData, flipping, user]); //dependencies in the current useeffect

  /**
   * is triggered by currentChoice element
   */
  useEffect(() => {
    const handleResult = (data: CoinFlipResult) => {
      if(timeoutRef.current){
      clearTimeout(timeoutRef.current);}
      const resultMapped: "W" | "C" = data.landingSide === "Wise" ? "W" : "C";

      const win = currentChoice === resultMapped;

      setRotation((prev) => {
        const normalized = prev % 360;
        const spins = 17;
        const final = resultMapped === "W" ? 0 : 180;

        return prev + spins * 360 + (final - normalized);
      });

      /**
       * shows what is logged in the web console
       */
      console.log("Result:", resultMapped); 
      console.log("Win:", win);
      console.log("Winnings:", data.winnings);
      console.log("Message", data.message);
    };

    connection.on("UpdateClient", handleResult); //listens on UpdateClient from backend

    return () => {
      connection.off("UpdateClient", handleResult); //stops listening on UpdateClient from the backend
    };
  }, [currentChoice]); //dependency for triggering useeffect


  /**
   * triggered by first render
   */
    useEffect(() => {
    const errorHandler = (msg: string) => {
      console.error("Server error:", msg);
      setFlipping(false);
      setCurrentChoice(null);
    };

    connection.on("ErrorMessageToClient", errorHandler); //listen ErrorMessageToClient

    return () => {
      connection.off("ErrorMessageToClient", errorHandler); //stops to lisen on errormessageClient
    };
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <div
        className="w-[500px] h-[500px] relative [transform-style:preserve-3d] transition-transform duration-[7000ms] ease-out"
        style={{ transform: `rotateY(${rotation}deg)` }}
        onTransitionEnd={() => {
          setFlipping(false);
          setCurrentChoice(null);
          onFlipped();
        }}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full flex items-center justify-center text-[250px] font-bold rounded-full text-gray-400 [backface-visibility:hidden] bg-[radial-gradient(circle,#ffd700,#c89b00)]">
          W
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full flex items-center justify-center text-[250px] font-bold rounded-full text-gray-400 [backface-visibility:hidden] bg-[radial-gradient(circle,#ffd700,#c89b00)] [transform:rotateY(180deg)]">
          C
        </div>
      </div>
    </div>
  );
}