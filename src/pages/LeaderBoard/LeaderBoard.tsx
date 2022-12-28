import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Firebase
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import Box from "@mui/material/Box";
import ViewIcon from "@mui/icons-material/Leaderboard";

import LevelSelector from "../../components/LevelSelector/LevelSelector";
import LeaderBoardTable from "../../components/LeaderBoardTable/LeaderBoardTable";

import { getFormattedTime } from "../../utils/getFormattedTime";
import { getTimeFromSeconds } from "../../utils/getTimeFromSecs";
import { useAppSelector } from "../../hooks/redux";

export default function LeaderBoard() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const levels = useAppSelector((state) => state.game.gameBoards);
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(
        () => {
            let boardId = null;
            // Router State will have boardId when redirected from Game
            if (state) {
                boardId = state.boardId;
            }
            return boardId;
        },
    );
    const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoard.Data[]>(
        [],
    );

    // Select the First Game Board by Default
    useEffect(() => {
        if (levels.length !== 0 && !selectedBoardId) {
            setSelectedBoardId(levels[0].id);
        }
    }, [levels, selectedBoardId]);

    // Fetch Leader Board Data from Firestore
    useEffect(() => {
        if (!selectedBoardId) return;

        (async () => {
            const collectionRef = collection(
                db,
                "game-boards",
                selectedBoardId,
                "scores",
            );

            const scoresQuery = query(
                collectionRef,
                orderBy("completedIn", "asc"),
            );

            const scores: LeaderBoard.Data[] = [];
            const docs = await getDocs(scoresQuery);
            docs.forEach((doc) => {
                const data = doc.data() as LeaderBoard.RawData;
                const completedIn = getFormattedTime(
                    getTimeFromSeconds(data.completedIn),
                );
                scores.push({
                    id: doc.id,
                    name: data.name,
                    completedIn,
                    achievedOn: data.achievedOn.toDate(),
                });
            });

            setLeaderBoardData(scores);
        })();
    }, [selectedBoardId]);

    const gameBoardName =
        levels.find((level) => level.id === selectedBoardId)?.title ?? "";

    const handleLevelSelect = (id: string) => {
        setSelectedBoardId(id);
        // Reset Router State, Otherwise on page reload states boardId is loaded
        window.history.replaceState(null, "");
    };
    const handlePlayGame = () => navigate(`/game/${selectedBoardId}`);

    return (
        <Box
            sx={{
                display: "grid",
                gap: 2,
                gridTemplateRows: "auto 1fr",
                maxHeight: "90vh",
            }}
        >
            <LevelSelector
                levels={levels}
                ActionIcon={ViewIcon}
                actionTitleStart="View LeaderBoard"
                onSelect={handleLevelSelect}
                fullScreen={false}
                height={250}
            />
            {selectedBoardId && (
                <LeaderBoardTable
                    leaderBoardData={leaderBoardData}
                    gameBoardName={gameBoardName}
                    onPlayGame={handlePlayGame}
                />
            )}
        </Box>
    );
}
