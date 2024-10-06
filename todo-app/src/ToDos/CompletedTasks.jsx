import React from 'react';
import { Button } from 'primereact/button';

const CompletedTasks = ({ completedTasks, onDeleteTask }) => {
    return (
        <div className="completed-tasks-container">
            <h2 style={{ textAlign: 'center'}}>Completed Tasks</h2>
            {completedTasks.length === 0 ? (
                <p style={{ textAlign: 'center'}}>No completed tasks available.</p>
            ) : (
                <ul className="task-list">
                    {completedTasks.map((task, index) => (
                        <li key={index} className="task-item completed-task-item">
                            <span style={{ width: '150px', display: 'inline-block' }}>
                                {task.text} (Completed at: {task.completedAt})
                            </span>
                            <div className="task-buttons">
                                <Button
                                    style={{ backgroundColor: 'var(--surface-500)', color: 'var(--primary-color-text)' }}
                                    icon="pi pi-times"
                                    className="delete-button"
                                    onClick={() => onDeleteTask(index)}
                                    aria-label="Delete"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CompletedTasks;
