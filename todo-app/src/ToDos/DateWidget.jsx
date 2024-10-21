import React from 'react';
import './DateWidget.css';

const DateWidget = () => {
    const getCurrentDate = () => {
        const date = new Date();
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="date-widget">
            <div className="date-display">{getCurrentDate()}</div>
            <div className="date-footer">Today</div>
        </div>
    );
};

export default DateWidget;
