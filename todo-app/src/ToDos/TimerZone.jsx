import React, { useEffect, useState } from "react"

const TimerZone = () => {
    const [clock, setClock] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setClock(new Date().toLocaleTimeString())
        }, 1000);
       return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="clock-container">
            <p className="clock">{clock}</p>
        </div>
    )
}
export default TimerZone;