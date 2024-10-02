import React, { useEffect, useRef } from "react";
import TimerZone from "./TimerZone";

const NewsBanner = () => {
    const newsRef = useRef(null);

    return (
        <div className="news-banner mt-2">
            <div className="news-content" ref={newsRef} style={{ animation: 'scroll 30s linear infinite' }}
                onMouseEnter={() => {
                    newsRef.current.style.animationPlayState = 'paused';
                }}
                onMouseLeave={() => {
                    newsRef.current.style.animationPlayState = 'running';
                }}>
                <TimerZone />
            </div>
        </div>
    )
}
export default NewsBanner;