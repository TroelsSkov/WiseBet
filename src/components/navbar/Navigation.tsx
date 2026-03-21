import BalancePill from "./BalancePill"
import PlayTimeCounter from "./PlayTimeCounter"
import wisebetLogo from "../../assets/wisebet.png"
import UserMenu from "./UserMenu"
import Button from "../form/Button"
import DepositButton from "./DepositButton"
import { Link } from "react-router-dom"

function Navigation() {
    return (
        <>
            <div className=" h-full flex items-center mx-8">
                <div className="flex-1">
                    <Link to="/" className="flex items-center">
                        <img src={wisebetLogo} className="h-12 w-12" alt="WiseBet logo" />
                        <p className="ml-2 text-xl font-bold">WiseBet</p>
                    </Link>
                </div>

                <div className="flex flex-1 justify-center">
                    <PlayTimeCounter startTime={new Date()} />
                </div>

                <div className="flex flex-1 justify-end gap-4">
                    <BalancePill balance={1000} />
                    <DepositButton />
                    <UserMenu />
                </div>
            </div>
        </>
    )
}

export default Navigation