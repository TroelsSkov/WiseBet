import BalancePill from "./BalancePill"
import PlayTimeCounter from "./PlayTimeCounter"
import wisebetLogo from "../../assets/wisebet.png"
import UserMenu from "./UserMenu"
// import Button from "../form/Button" // Unused
import DepositButton from "./DepositButton"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiService } from "../../services/apiService"
import { useEventListener } from "../../services/globalEvents"


function Navigation() {

    const [userSaldo, setUserSaldo] = useState(0);

    useEffect(() => {
        apiService.get("/Api/Users/me/UserAccount/saldo").then((res) => {
            console.log(res.data);
            setUserSaldo(res.data as number);
        }).catch((err) => {
            console.log("[Navigation] Unable to update balance: " + err);
        })
    }, [])

    useEventListener('saldo-event', ({ }) => {
        apiService.get("/Api/Users/me/UserAccount/saldo").then((res) => {
            console.log(res.data);
            setUserSaldo(res.data as number);
        }).catch((err) => {
            console.log("[Navigation] Unable to update balance: " + err);
        })
    })

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
                    <BalancePill balance={userSaldo} />
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