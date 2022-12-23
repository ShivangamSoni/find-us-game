import { Route, Routes } from "react-router";

import { SnackbarProvider } from "notistack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import WithAuth from "./components/WithAuth/WithAuth";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";

export default function App() {
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            domRoot={document.getElementById("notification") as HTMLElement}
        >
            <Container maxWidth="lg" sx={{ padding: { xs: 0 } }}>
                <Header />
                <Box component="main" sx={{ px: 2, py: 4 }}>
                    <Toolbar variant="dense" />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/game"
                            element={
                                <WithAuth>
                                    <Game />
                                </WithAuth>
                            }
                        />
                    </Routes>
                </Box>
            </Container>
        </SnackbarProvider>
    );
}
