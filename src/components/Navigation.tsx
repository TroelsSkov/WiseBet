import BalancePill from "./BalancePill"
import PlayTimeCounter from "./PlayTimeCounter"
import wisebetLogo from "../assets/wisebet.png"

function Navigation() {
    return (
        <>
            <div className=" h-full flex items-center mx-8">
                <div className="flex-1">
                    <a href="/" className="flex items-center">
                        <img src={wisebetLogo} className="h-12 w-12" alt="WiseBet logo" />
                        <p className="ml-2 text-xl font-bold">WiseBet</p>
                    </a>
                </div>

                <div className="flex flex-1 justify-center">
                    <PlayTimeCounter startTime={new Date()} />
                </div>

                <div className="flex flex-1 justify-end">
                    <BalancePill balance={1000} />
                    User menu n stuff
                </div>
            </div>
        </>
    )
}

export default Navigation