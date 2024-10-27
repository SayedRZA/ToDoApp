import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title, Filler } from 'chart.js';
import './DoughnutChart.css';

ChartJS.register(Tooltip, Legend, ArcElement, Title, Filler);

const DoughnutChart = ({ completedTasks, tasks }) => {
    const [isOpen, setIsOpen] = useState(false);

    const completedCount = completedTasks.length;
    const uncompletedCount = tasks.length;

    const data = {
        labels: ['Completed', 'Uncompleted'],
        datasets: [
            {
                data: [completedCount, uncompletedCount],
                backgroundColor: ['#4CAF50', '#F44336'],
                hoverBackgroundColor: ['#45A049', '#E53935'],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    const toggleChart = () => {
        setIsOpen(prev => !prev); 
    };

    return (
        <div className='doughnut-chart-container' onClick={toggleChart}>
            {isOpen && (
                <>
                    <div className="chart-wrapper">
                        <Doughnut data={data} options={options} />
                    </div>
                </>
            )}
            {!isOpen && (
                <div className="chart-placeholder">
                    Click to Open Chart
                </div>
            )}
        </div>
    );
};

export default DoughnutChart;
