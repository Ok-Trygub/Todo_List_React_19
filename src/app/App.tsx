import React from 'react';
import {Route, Routes} from "react-router-dom";
import UsersPage from "../pages/Users/UsersPage";
import TodoListPage from "../pages/TodoList/TodoListPage";


function App() {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />}></Route>
            <Route path="/:userId/tasks" element={<TodoListPage />}></Route>
        </Routes>
    );
}

export default App;
