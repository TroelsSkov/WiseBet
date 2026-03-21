import { formatNumber } from "../utils/formatNumber";
import wisebetLogo from "../assets/wisebet.png"

interface BalancePillProps {
    balance: number;
}

function BalancePill({ balance }: BalancePillProps) {
    return (
        <div className="flex items-center gap-1 bg-gray-800 rounded px-4">
            <img src={wisebetLogo} alt="WiseBet logo" className="h-4 w-4 rounded-full" />
            {formatNumber(balance)}
        </div>
    )
}

export default BalancePill