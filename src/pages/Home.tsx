import { useApi } from "../services/useApi";
import { apiService } from "../services/apiService";
import GameCard from "../components/home/GameCard"
import rouletteImage from "../assets/roulette.png"
import coinflipImage from "../assets/coinflip.png"
import blackjackImage from "../assets/blackjack.png"

function Home() {
  // Fetch current user (WIP)
  const { data: user, loading, error, refetch } =
    useApi<User>("/users/me");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex items-center justify-center gap-8 flex-wrap mt-8">
        <GameCard name="Roulette" game="roulette" image={rouletteImage} />
        <GameCard name="Coinflip" game="coinflip" image={coinflipImage} />
        <GameCard name="Blackjack" game="blackjack" image={blackjackImage} />
      </div>
    </>
  )
}

export default Home
