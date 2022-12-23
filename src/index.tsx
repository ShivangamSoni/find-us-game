import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

// MUI Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";

import AuthProvider from "./Context/AuthContext";
import GameProvider from "./Context/GameContext";

import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <CssBaseline />
        <BrowserRouter>
            <AuthProvider>
                <GameProvider>
                    <App />
                </GameProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
