import BalancePill from "./BalancePill"
import PlayTimeCounter from "./PlayTimeCounter"
import wisebetLogo from "../../assets/wisebet.png"
import UserMenu from "./UserMenu"
import DepositButton from "./DepositButton"
import { Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"

function Navigation() {
    const { user } = useUser();

    return (
        <>
            <div className="h-full flex items-center mx-8">
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
                    {user && <BalancePill balance={user.balance} />}
                    {user && <DepositButton />}
                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <Link to="/login" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                            Log ind
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navigation