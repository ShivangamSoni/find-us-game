import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";

import PlayIcon from "@mui/icons-material/PlayArrow";

import LevelSelector from "../../components/LevelSelector/LevelSelector";

export default function Home() {
    const navigate = useNavigate();
    const levels = useAppSelector((state) => state.game.gameBoards);

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
