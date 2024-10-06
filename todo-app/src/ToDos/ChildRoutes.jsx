import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToDoList from './ToDoList';
import CompletedTasks from './CompletedTasks';
import NavMenu from './NavMenu';

const App = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

    return (
        <Router>
            <NavMenu />
            <Routes>
                <Route path="/" element={<ToDoList setCompletedTasks={setCompletedTasks} />} />
                <Route path="/completed" element={<CompletedTasks completedTasks={completedTasks} />} />
            </Routes>
        </Router>
    );
};

export default App;
