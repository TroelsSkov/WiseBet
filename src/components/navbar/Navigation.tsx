import BalancePill from "./BalancePill"
import PlayTimeCounter from "./PlayTimeCounter"
import UserMenu from "./UserMenu"
import DepositButton from "./DepositButton"
import { Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"


import { useEffect, useState } from "react"
import { apiService } from "../../services/apiService"
import { useEventListener } from "../../services/globalEvents"


function Navigation() {
    
    const { user } = useUser();
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
        console.log("[Navigation] Saldo tried updating");
        apiService.get("/Api/Users/me/UserAccount/saldo").then((res) => {
            console.log(res.data);
            setUserSaldo(res.data as number);
        }).catch((err) => {
            console.log("[Navigation] Unable to update balance: " + err);
        })
    })

    return (
        <>
            <div className="h-full flex items-center mx-8">
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
                    {user && <BalancePill balance={userSaldo} />}
                    {user && <DepositButton />}
                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <Link to="/login" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                            Log ind
                        </Link>
                    )}
                    {/* <BalancePill balance={userSaldo} />
                    <DepositButton /> */}
                    {/* <UserMenu user={{
                        username: user?.username,
                        FullName: user?.FullName,
                        balance: user?.balance
                    }} /> */}
                </div>
            </div>
        </>
    )
}

export default Navigation