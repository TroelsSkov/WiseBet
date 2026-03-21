import GameCard from "../components/home/GameCard"
import rouletteImage from "../assets/roulette.png"
import coinflipImage from "../assets/coinflip.png"
import blackjackImage from "../assets/blackjack.png"

function Home() {
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
