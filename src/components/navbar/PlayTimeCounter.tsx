import { faClock } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

interface PlayTimeCounterProps {
    startTime: string | Date;
}

function PlayTimeCounter({ startTime }: PlayTimeCounterProps) {
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const start = new Date(startTime).getTime()

        const interval = setInterval(() => {
            const now = Date.now()
            setElapsed(Math.floor((now - start) / 1000))
        }, 1000)

        return () => clearInterval(interval)
    }, [startTime])

    const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0")
    const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0")
    const seconds = String(elapsed % 60).padStart(2, "0")

    return (
        <div className="">
            <FontAwesomeIcon icon={faClock} />
            {hours}:{minutes}:{seconds}
        </div>
    )
}

export default PlayTimeCounter