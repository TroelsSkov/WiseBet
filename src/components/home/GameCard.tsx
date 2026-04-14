import { Link, useNavigate } from "react-router-dom";
import Button from "../form/Button";

interface GameCardProps {
    name: string;
    game: string;
    image?: string;
}

function GameCard({ name, game, image }: GameCardProps) {
    const navigate = useNavigate();

    function handleGameCreation() {
        alert("Creating game: " + name); // TODO: actually create game and redirect to it based on backend resp
        // example redirect: /games/blackjack/12345
        navigate(`/games/${game}/1234`);
    }

    return (
        <div className="relative border border-gray-800 rounded overflow-hidden h-84 w-84 flex gap-4 flex-col items-center justify-center">
            {image && (
                <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="relative z-10 flex flex-col gap-2 p-4 items-center w-full">
                <h3 className="text-lg font-bold">{name}</h3>
                <span>
                    <Button onClick={handleGameCreation}>
                        Spil nu
                    </Button>
                </span>
            </div>
        </div>
    );
}

export default GameCard;