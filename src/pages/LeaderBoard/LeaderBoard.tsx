import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { db, storage } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

import Box from "@mui/material/Box";
import ViewIcon from "@mui/icons-material/TableView";

import LevelSelector from "../../components/LevelSelector/LevelSelector";
import LeaderBoardTable from "../../components/LeaderBoardTable/LeaderBoardTable";

import { getFormattedTime } from "../../utils/getFormattedTime";
import { getTimeFromSeconds } from "../../utils/getTimeFromSecs";

export default function LeaderBoard() {
    const navigate = useNavigate();
    const [levels, setLevels] = useState<Game.RawGameBoard[]>([]);
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
    const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoard.Data[]>(
        [],
    );

    useEffect(() => {
        (async () => {
            const boardsCollectionRef = collection(db, "game-boards");
            const docs = await getDocs(boardsCollectionRef);

            const levelsData: Game.RawGameBoard[] = [];
            docs.forEach((doc) => {
                const data = doc.data() as Game.RawGameBoard;
                levelsData.push({ ...data, id: doc.id });
            });
            const imageURLs = await Promise.all(
                levelsData.map((doc) => {
                    const imageRef = ref(storage, doc.url);
                    return getDownloadURL(imageRef);
                }),
            );
            imageURLs.forEach((url, idx) => (levelsData[idx].url = url));
            setLevels(levelsData);
            setSelectedBoardId(levelsData[0].id ?? null);
        })();
    }, []);

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

    const handleLevelSelect = (id: string) => setSelectedBoardId(id);
    const handlePlayGame = () => navigate(`/game/${selectedBoardId}`);

    return (
        <Box
            sx={{
                display: "grid",
                gap: 2,
                gridTemplateRows: "auto 1fr",
                maxHeight: "88vh",
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
                    onPlayGame={handlePlayGame}
                />
            )}
        </Box>
    );
}
