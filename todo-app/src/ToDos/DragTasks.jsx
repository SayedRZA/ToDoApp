import React, { useRef, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import NavMenu from "./NavMenu";
import CompletedTasks from "./CompletedTasks";
import './DragTasks.css'


const DragTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [selectPriority, setSelectPriority] = useState('Low');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [view, setView] = useState('uncompleted');
    const [droppedTasks, setDroppedTasks] = useState(Array(16).fill(null)); 
    const toast = useRef(null);

    const priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
    ];

    const handleAddTask = () => {
        const moreItem = document.getElementById('item-id').value.trim();
        if (moreItem === '') {
            toast.current.show({ severity: 'error', summary: 'Oops!', detail: 'Value cannot be empty' });
            return;
        }
        if (tasks.some(task => task.text === moreItem)) {
            toast.current.show({ severity: 'warn', summary: 'Try again!', detail: 'Task already exists' });
            return;
        }
        document.getElementById('item-id').value = '';
        toast.current.show({ severity: 'success', summary: 'Great!', detail: 'Task was created successfully' });
        setTasks([...tasks, { text: moreItem, priority: selectPriority }]);
        setSelectPriority('Low');
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        toast.current.show({ severity: 'error', summary: 'Mmm!', detail: 'Task deleted' });
    };

    const handleEditTask = (index, task) => {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setEditValue(task.text);
        setSelectPriority(task.priority);
    };

    const handleSaveTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { text: editValue.trim(), priority: selectPriority };
        setTasks(updatedTasks);
        setIsEditing(false);
        setEditValue('');
        setSelectPriority('Low');
    };

    const handleCompleteTask = (index) => {
        const completedTask = tasks[index];
        setCompletedTasks([...completedTasks, { ...completedTask, completedAt: new Date().toLocaleString() }]);
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        toast.current.show({ severity: 'success', summary: 'Great!', detail: 'Task completed' });
    };

    const handleMenuItemClick = (newView) => {
        setView(newView);
    };

    const handleDeleteCompletedTask = (index) => {
        setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    };


    const handleDrop = (index) => (e) => {
        const taskIndex = e.dataTransfer.getData('text/plain');
        const taskToDrop = tasks[taskIndex];

        if (droppedTasks[index] === null) {
            const newDroppedTasks = [...droppedTasks];
            newDroppedTasks[index] = taskToDrop;
            setDroppedTasks(newDroppedTasks);
            handleDeleteTask(taskIndex); // Remove task from original list
            toast.current.show({ severity: 'success', summary: 'Task Dropped', detail: `Task ${taskToDrop.text} added to slot ${index + 1}` });
        } else {
            toast.current.show({ severity: 'warn', summary: 'Slot Occupied', detail: `Slot ${index + 1} is already occupied` });
        }
    };

    const handleCompleteDroppedTask = (index) => {
        const completedTask = droppedTasks[index];
        if (completedTask) {
            setCompletedTasks([...completedTasks, { ...completedTask, completedAt: new Date().toLocaleString() }]);
            const newDroppedTasks = [...droppedTasks];
            newDroppedTasks[index] = null; // Clear the slot
            setDroppedTasks(newDroppedTasks);
            toast.current.show({ severity: 'success', summary: 'Task Completed', detail: `Task ${completedTask.text} marked as completed` });
        }
    };

    return (
        <div>
            <>
                <div className="flex-container">
                    <div className="todo-container flex-item" style={{ flex: '1', marginRight: '10px' }}>
                        <Toast ref={toast} />
                        {tasks.length === 0 ? (
                            <div className="empty-message">
                                <h3>Create a task above</h3>
                            </div>
                        ) : (
                            <ul className="task-list">
                                {tasks.map((item, index) => (
                                    <li
                                        className={`task-item ${item.priority.toLowerCase() + '-priority'}`}
                                        key={index}
                                        draggable
                                        onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                                        style={{ margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    >
                                        {isEditing && currentTaskIndex === index ? (
                                            <div className="edit-save-container">
                                                <InputText
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="edit-input"
                                                />
                                                <Dropdown
                                                    value={selectPriority}
                                                    options={priorityOptions}
                                                    onChange={(e) => setSelectPriority(e.value)}
                                                    className="priority-dropdown"
                                                />
                                                <Button label="Save" severity="secondary" raised onClick={() => handleSaveTask(index)} />
                                            </div>
                                        ) : (
                                            <div className="task-display-container" style={{ flexGrow: 1 }}>
                                                <span style={{ width: '150px', display: 'inline-block' }}>
                                                    {item.text} ({item.priority})
                                                </span>
                                                <div className="task-buttons">
                                                    <Button
                                                        style={{ backgroundColor: 'var(--surface-500)', color: 'var(--primary-color-text)' }}
                                                        icon="pi pi-check"
                                                        className="complete-button"
                                                        onClick={() => handleCompleteTask(index)}
                                                        aria-label="Complete"
                                                    />
                                                    <Button
                                                        style={{ backgroundColor: 'var(--surface-500)', color: 'var(--primary-color-text)' }}
                                                        icon="pi pi-pencil"
                                                        className="edit-button"
                                                        onClick={() => handleEditTask(index, item)}
                                                        aria-label="Edit"
                                                    />
                                                    <Button
                                                        style={{ backgroundColor: 'var(--surface-500)', color: 'var(--primary-color-text)' }}
                                                        icon="pi pi-times"
                                                        className="delete-button"
                                                        onClick={() => handleDeleteTask(index)}
                                                        aria-label="Delete"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Drop Zones */}
                    <div className="drop-zone flex-item">
                        <div className="container">
                        {droppedTasks.map((task, index) => (
                            <div
                                key={index}
                                onDrop={handleDrop(index)}
                                onDragOver={(e) => e.preventDefault()}
                                className={`task-item ${task ? task.priority.toLowerCase() + '-priority' : ''}`}
                                style={{
                                    margin: '5px',
                                    width: 'calc(25% - 10px)',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: task ? undefined : '#f9f9f9',
                                    color: task ? undefined : '#000',
                                }}
                                draggable={task ? true : false}
                                onDragStart={(e) => task && e.dataTransfer.setData('text/plain', index)}
                            >
                                {task ? (
                                    <>
                                        <span>{task.text}</span>
                                        <Button
                                            style={{ backgroundColor: 'var(--surface-500)', color: 'var(--primary-color-text)' }}
                                            icon="pi pi-check"
                                            className="complete-button"
                                            onClick={() => handleCompleteDroppedTask(index)}
                                            aria-label="Complete"
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                        ))}
                    </div>
                    </div>
                </div>

            </>
        </div>
    );
}

export default DragTasks;