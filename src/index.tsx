import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import AuthProvider from "./Context/AuthContext";

// Redux
import { Provider } from "react-redux";
import store from "./REDUX/store";

import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <CssBaseline />
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
