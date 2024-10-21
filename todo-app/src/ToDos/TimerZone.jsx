import React, { useEffect, useState } from 'react';
import './Clock.css'; 

const TimerZone = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getHourRotation = () => {
        const hours = time.getHours() % 12;
        const minutes = time.getMinutes();
        return (hours + minutes / 60) * 30;
    };

    const getMinuteRotation = () => {
        const minutes = time.getMinutes();
        return (minutes + time.getSeconds() / 60) * 6;
    };

    const getSecondRotation = () => {
        return time.getSeconds() * 6; 
    };

    return (
        <div className="clock-widget">
            <div className="clock-face">
                <div
                    className="hour-hand"
                    style={{ transform: `rotate(${getHourRotation()}deg)` }}
                ></div>
                <div
                    className="minute-hand"
                    style={{ transform: `rotate(${getMinuteRotation()}deg)` }}
                ></div>
                <div
                    className="second-hand"
                    style={{ transform: `rotate(${getSecondRotation()}deg)` }}
                ></div>
            </div>
        </div>
    );
};

export default TimerZone;