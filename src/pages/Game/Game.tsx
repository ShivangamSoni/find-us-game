import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase Configs
import { db, storage } from "../../firebase";
// Firestore
import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
// Firebase Storage
import { ref, getDownloadURL } from "firebase/storage";

import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { useTimer } from "../../hooks/useTimer";
import { getCoordinates, verifyLocation } from "../../utils/game";
import { getFormattedTime } from "../../utils/getFormattedTime";

import CharacterList from "../../components/CharacterList/CharacterList";
import Timer from "../../components/Timer/Timer";
import SelectionMenu from "../../components/SelectionMenu/SelectionMenu";
import PlayerForm from "../../components/PlayerForm/PlayerForm";

export default function Game() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const {
        time: { minutes, seconds },
        startTimer,
        pauseTimer,
    } = useTimer();

    const [level, setLevel] = useState<Game.GameBoard | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Game.Coordinates>({
        coordX: 0,
        coordY: 0,
    });
    const [showMenuDialog, setShowMenuDialog] = useState(false);
    const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

    const [showUsernameDialog, setShowUsernameDialog] = useState(false);

    // Get Game Board from firestore
    useEffect(() => {
        const docRef = doc(db, "game-boards", "klSgmEqahQCvfFqBxgbM");
        const charcatersColRef = collection(docRef, "characters");

        (async () => {
            try {
                const docSnap = await getDoc(docRef);
                const gameBoard = docSnap.data() as Game.RawGameBoard;
                const gbImageRef = ref(storage, gameBoard.url);
                const url = await getDownloadURL(gbImageRef);
                gameBoard.url = url;

                const charactersSnap = await getDocs(charcatersColRef);
                const characters: Game.Character[] = [];
                charactersSnap.forEach(async (doc) => {
                    const data = doc.data() as Game.RawCharacter;
                    const loc: Game.Coordinates = {
                        coordX: data.coordX,
                        coordY: data.coordY,
                    };

                    const imageRef = ref(storage, data.url);
                    const url = await getDownloadURL(imageRef);

                    characters.push({
                        id: doc.id,
                        loc,
                        url,
                        name: data.name,
                        found: false,
                    });
                });

                const levelData: Game.GameBoard = {
                    id: docSnap.id,
                    ...gameBoard,
                    characters,
                };

                setLevel(levelData);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // Start Time
    useEffect(() => {
        startTimer();
    }, [startTimer]);

    // End Game if All Characters Found
    useEffect(() => {
        if (!level || level.characters.length === 0) return;

        const allFound = level.characters.every((char) => char.found);

        if (!allFound) return;

        pauseTimer();
        setShowUsernameDialog(true);
    }, [level, seconds, minutes, pauseTimer]);

    const toggleMenuDialog = () => setShowMenuDialog((prev) => !prev);

    const handleClick: MouseEventHandler<HTMLImageElement> = (e) => {
        e.stopPropagation();
        setSelectedLocation(getCoordinates(e));

        if (!showMenuDialog) {
            setDialogPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }
        toggleMenuDialog();
    };

    const handleMenuSelection = (id: string) => {
        const selectedCharacter = level?.characters.find(
            (char) => char.id === id,
        );

        if (!selectedCharacter) return;

        const found = verifyLocation({
            selectedLocation,
            characterLocation: selectedCharacter.loc,
        });

        if (!found) {
            enqueueSnackbar(`That wasn't "${selectedCharacter.name}"`, {
                variant: "error",
            });
        } else {
            enqueueSnackbar(`Found "${selectedCharacter.name}"`, {
                variant: "success",
            });
            setLevel((prev) => {
                if (!prev) return null;

                const characters = prev.characters.map((char) => {
                    if (char.name === selectedCharacter.name) {
                        return { ...char, found };
                    }

                    return char;
                });
                return {
                    ...prev,
                    characters,
                };
            });
        }

        toggleMenuDialog();
    };

    const handleUsernameSubmit = async (username: string) => {
        const docRef = doc(db, "game-boards", "klSgmEqahQCvfFqBxgbM");
        const scoresColRef = collection(docRef, "scores");

        try {
            await addDoc(scoresColRef, {
                name: username,
                completedOn: getFormattedTime({ minutes, seconds }),
                achievedOn: serverTimestamp(),
            });
            enqueueSnackbar(`Score Submitted for Player: "${username}"!`, {
                variant: "success",
            });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleUsernameSubmitCancel = () => {
        enqueueSnackbar("You cancelled the Score Submission!", {
            variant: "info",
        });
        navigate("/");
    };

    if (!level) {
        return null;
    }

    const charactersToFind = level.characters.filter((char, i) => !char.found);

    return (
        <Box>
            <Box
                component="header"
                sx={{
                    display: "flex",
                    alignItems: {
                        sm: "center",
                    },
                    justifyContent: "space-between",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    gap: 1,
                    mb: 1,
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <CharacterList characters={level.characters} />
                </Box>
                <Box>
                    <Timer minutes={minutes} seconds={seconds} />
                </Box>
            </Box>

            <Box
                sx={{
                    "& > img": {
                        width: "100%",
                    },
                }}
            >
                <img src={level.url} alt="" onClick={handleClick} />
            </Box>

            {charactersToFind.length !== 0 && (
                <Dialog
                    open={showMenuDialog}
                    onClose={toggleMenuDialog}
                    slots={{
                        backdrop: () => null,
                    }}
                    sx={{
                        "inset": "unset",
                        "top": dialogPosition.y,
                        "left": dialogPosition.x,
                        "m": 1,

                        "& > .MuiDialog-container, & .MuiPaper-root": {
                            m: 0,
                        },
                    }}
                >
                    <DialogTitle>Which Character</DialogTitle>
                    <SelectionMenu
                        characters={charactersToFind}
                        onClick={handleMenuSelection}
                    />
                </Dialog>
            )}

            {charactersToFind.length === 0 && (
                <Dialog open={showUsernameDialog} onClose={() => {}}>
                    <PlayerForm
                        numberOfCharacters={level.characters.length}
                        time={{ minutes, seconds }}
                        onSubmit={handleUsernameSubmit}
                        onCancel={handleUsernameSubmitCancel}
                    />
                </Dialog>
            )}
        </Box>
    );
}
