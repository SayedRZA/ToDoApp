import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './NavMenu';
import CompletedTasksInfo from './CompletedTasksInfo';

const App = () => {
    return (
        <Router>
            <NavMenu />
            <Routes>
                <Route path="/completed" element={<CompletedTasksInfo />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;