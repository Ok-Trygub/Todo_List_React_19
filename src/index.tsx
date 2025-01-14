import React from 'react';
import './app/index.css';
import App from './app/App';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";


const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
