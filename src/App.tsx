import { useEffect } from "react";
import { Route, Routes } from "react-router";

// Auth
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthCtx } from "./Context/AuthContext";

import { SnackbarProvider } from "notistack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";

export default function App() {
    const { user } = useAuthCtx();
    useEffect(() => {
        (async () => {
            try {
                await signInAnonymously(auth);
            } catch (err) {
                console.log(err);
            }
        })();

        return () => {
            user?.delete().then();
        };
    }, [user]);

    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            domRoot={document.getElementById("notification") as HTMLElement}
        >
            <Container maxWidth="lg" sx={{ padding: { xs: 0 } }}>
                <Header />
                <Box component="main" sx={{ px: 2, py: 4 }}>
                    <Toolbar variant="dense" />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game/:boardId" element={<Game />} />
                        <Route path="/leader-board" element={<LeaderBoard />} />
                    </Routes>
                </Box>
            </Container>
        </SnackbarProvider>
    );
}
