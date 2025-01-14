import React from 'react';
import {Route, Routes} from "react-router-dom";
import UsersPage from "../pages/Users/UsersPage";
import Tasks from "../pages/Tasks/tasks";


function App() {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />}></Route>
            <Route path="/:userId/tasks" element={<Tasks />}></Route>
        </Routes>
    );
}

export default App;
