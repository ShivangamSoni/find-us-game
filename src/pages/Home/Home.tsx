import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { db, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

import PlayIcon from "@mui/icons-material/PlayArrow";

import LevelSelector from "../../components/LevelSelector/LevelSelector";

export default function Home() {
    const navigate = useNavigate();
    const [levels, setLevels] = useState<Game.RawGameBoard[]>([]);

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
        })();
    }, []);

    const handleLevelSelect = (id: string) => navigate(`/game/${id}`);

    return (
        <LevelSelector
            levels={levels}
            ActionIcon={PlayIcon}
            actionTitleStart={"Play Level"}
            onSelect={handleLevelSelect}
        />
    );
}
