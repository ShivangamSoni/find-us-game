import { useEffect } from "react";
import { Route, Routes } from "react-router";

// Firebase
import { db, storage } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

// Auth
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthCtx } from "./Context/AuthContext";

// Redux
import { useAppDispatch } from "./hooks/redux";
import { setGameBoards } from "./REDUX/gameSlice";

import { SnackbarProvider } from "notistack";
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
            imageURLs.forEach((url, idx) => (levelsData[idx].url = url));

            dispatch(setGameBoards(levelsData));
        })();
    }, [user, dispatch]);

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
