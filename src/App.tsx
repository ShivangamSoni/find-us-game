import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </BrowserRouter>
    );
}
