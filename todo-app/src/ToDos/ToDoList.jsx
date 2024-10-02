import React, { useRef, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import NavMenu from "./NavMenu";
// import NewsBanner from "./NewsBanner";

const ToDoList = () => {
    const [tasks, setTasks] = useState([
        { text: 'apple', priority: 'Low' },
        { text: 'orange', priority: 'Medium' }
    ]);
    const [selectPriority, setSelectPriority] = useState('Low');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const toast = useRef(null)

    const priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
    ];

    const handleAddTask = () => {
        const moreItem = document.getElementById('item-id').value.trim();
        if (moreItem === '') {
            toast.current.show({ severity: 'error', summary: 'Opps!', detail: 'Value cannot be empty' });
            return;
        }
        if (tasks.some(task => task.text === moreItem)) {
            toast.current.show({ severity: 'warn', summary: 'Try again!', detail: 'Task already exist' });
            return;
        }
        document.getElementById('item-id').value = '';
        toast.current.show({ severity: 'success', summary: 'Great!', detail: 'Task was created successfully' });
        setTasks([...tasks, { text: moreItem, priority: selectPriority }]);
        setSelectPriority('Low');
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
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

    return (
        <div >
        <NavMenu />
      {/* <NewsBanner /> */}
        <div className="todo-container" >
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
                <Button onClick={handleAddTask} label="Add Task" icon="pi pi-check" iconPos="right" />
            </div>
            </div>

            <div className="todo-container">
            <Toast ref={toast} />
            <div className="task-list-container">
                <ul className="task-list">
                    {tasks.map((item, index) => (
                        <li className="task-item" key={index}>
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
                                    <Button label="Save" onClick={() => handleSaveTask(index)} />
                                </div>
                            ) : (
                                <div className="task-display-container">
                                    <span>{item.text} ({item.priority})</span>
                                    <div className="task-buttons">
                                        <Button
                                            icon="pi pi-pencil"
                                            className="edit-button"
                                            onClick={() => handleEditTask(index, item)}
                                            aria-label="Edit"
                                        />
                                        <Button
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
            </div>
            </div>
        </div>
    );
}

export default ToDoList;
