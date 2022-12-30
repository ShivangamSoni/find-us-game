import { useEffect, useMemo } from "react";
import { Route, Routes, useMatch } from "react-router";

// Firebase
import { db, storage } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

// Auth
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthCtx } from "./Context/AuthContext";

// Redux
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setGameBoards } from "./REDUX/gameSlice";

import { generateImageKitURL } from "./utils/ImageKit";

import { SnackbarProvider } from "notistack";

// Theme
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getThemeTokens } from "./utils/getThemeTokens";
import { changeThemeMode } from "./REDUX/themeSlice";
import ThemeChanger from "./components/ThemeChanger/ThemeChanger";
import { COLORS } from "./Theme/colors";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Header from "./components/Header/Header";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";

export default function App() {
    const dispatch = useAppDispatch();
    const { user } = useAuthCtx();

    const { mode, color } = useAppSelector((state) => state.theme);
    const devicePreference = useMediaQuery("(prefers-color-scheme: dark)");

    const gamePathMatch = useMatch({ path: "/game/:boardId" });
    const { breakpoints } = useTheme();
    const isMobile = useMediaQuery(breakpoints.down("sm"));

    // Auto Theme Selection
    useEffect(() => {
        // No need for preference if User Selection already exists
        if (!localStorage.getItem("theme")) {
            dispatch(changeThemeMode(devicePreference ? "dark" : "light"));
        }
    }, [devicePreference, dispatch]);

    // Due to Security Rules Auth is needed for Firestore Access
    useEffect(() => {
        if (!user) {
            (async () => {
                try {
                    await signInAnonymously(auth);
                } catch (err) {
                    console.log(err);
                }
            })();
        }

        return () => {
            user?.delete().then();
        };
    }, [user]);

    // Fetch Raw Game Boards
    useEffect(() => {
        if (!user) return;
        (async () => {
            const boardsCollectionRef = collection(db, "game-boards");
            const docs = await getDocs(boardsCollectionRef);

            const levelsData: Game.RawGameBoard[] = [];
            docs.forEach((doc) => {
                const data = doc.data() as Game.RawGameBoard;
                levelsData.push({ ...data, id: doc.id });
            });

            // Fetch Image URLs Concurrently
            const imageURLs = await Promise.all(
                levelsData.map((doc) => {
                    const imageRef = ref(storage, doc.url);
                    return getDownloadURL(imageRef);
                }),
            );
            imageURLs.forEach(
                (url, idx) => (levelsData[idx].url = generateImageKitURL(url)),
            );

            dispatch(setGameBoards(levelsData));
        })();
    }, [user, dispatch]);

    const isGamePage = !!gamePathMatch;

    const theme = useMemo(
        () => createTheme(getThemeTokens(mode, COLORS[color])),
        [mode, color],
    );

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={5}
                autoHideDuration={5000}
                domRoot={document.getElementById("notification") as HTMLElement}
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "top",
                }}
            >
                <Paper variant="outlined" square sx={{ minHeight: "100vh" }}>
                    <Container
                        maxWidth={isGamePage ? "xl" : "lg"}
                        sx={{ padding: { xs: 0 } }}
                    >
                        <Header isMobile={isMobile} isGamePage={isGamePage} />
                        <ThemeChanger />
                        {!isMobile && !isGamePage && (
                            <Toolbar variant="dense" />
                        )}
                        <Box
                            component="main"
                            sx={{
                                px: isGamePage ? 0 : 1,
                                pt: isGamePage ? 0 : 3,
                                pb: isGamePage ? 0 : 2,
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/game/:boardId"
                                    element={<Game />}
                                />
                                <Route
                                    path="/leader-board"
                                    element={<LeaderBoard />}
                                />
                            </Routes>
                        </Box>
                        {(isMobile || isGamePage) && (
                            <Toolbar variant="dense" />
                        )}
                    </Container>
                </Paper>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
