import BalancePill from "./BalancePill"
import PlayTimeCounter from "./PlayTimeCounter"
import UserMenu from "./UserMenu"
// import Button from "../form/Button" // Unused
import DepositButton from "./DepositButton"
import { Link } from "react-router-dom"


function Navigation() {
    return (
        <>
            <div className=" h-full flex items-center mx-8">
                <div className="flex-1">
                    <Link to="/" className="flex items-center">
                        <img src="/wisebet.png" className="h-10 w-10 rounded-xl" alt="WiseBet logo" />
                        <p className="ml-2 text-xl font-bold">WiseBet</p>
                    </Link>
                </div>

                <div className="flex flex-1 justify-center">
                    <PlayTimeCounter startTime={new Date()} />
                </div>

                <div className="flex flex-1 justify-end gap-4">
                    <BalancePill balance={1000} />
                    <DepositButton />
                    <UserMenu user={{
                        username: "TestUserName",
                        FullName: "Tester Testerson",
                        saldo: 1000
                    }} />
                </div>
            </div>
        </>
    )
}

export default Navigation