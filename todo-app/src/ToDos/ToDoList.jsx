import React, { useRef, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import NavMenu from "./NavMenu";
import CompletedTasks from "./CompletedTasks";
import DragTasks from "./DragTasks";
import TimerZone from "./TimerZone";
import DateWidget from "./DateWidget";
import NoteWidget from "./NoteWidget";
import BMICalculator from "./BMICalculator";
import QuoteGenerator from "./QuoteGenerator";
import DoughnutChart from "./DoughnutChart";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [selectPriority, setSelectPriority] = useState('Low');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [view, setView] = useState('uncompleted');
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

    const renderUncompletedTasks = () => (
        <>

            <div style={{ position: 'fixed', top: '30px', left: '20px' }}>
                <TimerZone />
                <BMICalculator />
            </div>
            <div style={{ position: 'fixed', top: '160px', left: '20px' }}>
                <DateWidget />
                <NoteWidget />
            </div>
            <div style={{ position: 'fixed', top: '346px', left: '20px' }}>
                <QuoteGenerator />
            </div>
            <div style={{ position: 'fixed', top: '85px', left: '280px' }}>
                <DoughnutChart completedTasks={completedTasks} tasks={tasks} />
            </div>

            <div className="todo-container">
                <div className="toDoInput">
                    <h1>TO DO LIST</h1>
                    <InputText type="text" placeholder="Enter Task" id="item-id" className="input-text" />
                    <Dropdown
                        className="input-text"
                        value={selectPriority}
                        options={priorityOptions}
                        onChange={(e) => setSelectPriority(e.value)}
                        placeholder="Select Priority"
                    />
                    <Button label="Add Task" severity="secondary" raised onClick={handleAddTask} icon="pi pi-check" iconPos="right" />
                </div>
            </div>

            <div className="todo-container">
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
                                                disabled={isEditing}
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
        </>
    );

    return (
        <div>
            <NavMenu onMenuItemClick={handleMenuItemClick} />
            {view === 'uncompleted' && renderUncompletedTasks()}
            {view === 'completed' && <CompletedTasks completedTasks={completedTasks} onDeleteTask={handleDeleteCompletedTask} />}
            {view === 'dragTask' && <DragTasks />}
        </div>
    );
};
export default ToDoList;
