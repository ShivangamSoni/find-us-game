import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";

import { useTimer } from "../../hooks/useTimer";
import { getCoordinates, verifyLocation } from "../../utils/game";
import { generateImageKitURL } from "../../utils/ImageKit";

import GameHeader from "../../components/GameHeader/GameHeader";
import ImageKitImg from "../../components/ImageKitImg/ImageKitImg";
import SelectionMenu from "../../components/SelectionMenu/SelectionMenu";
import PlayerForm from "../../components/PlayerForm/PlayerForm";
import SnackbarAction from "../../components/SnackbarAction/SnackbarAction";

// 1 Hour Limit
const MAX_TIME_LIMIT = 3600;

export default function Game() {
    const navigate = useNavigate();
    const boardId = useParams().boardId as string;
    const { enqueueSnackbar } = useSnackbar();
    const {
        time: { minutes, seconds },
        rawSeconds,
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

    // Fetch Game Board from firestore
    useEffect(() => {
        const docRef = doc(db, "game-boards", boardId);
        const charactersColRef = collection(docRef, "characters");

        (async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    enqueueSnackbar(
                        <>
                            Invalid Game Board ID.
                            <br />
                            Please Select one from Listing.
                        </>,
                        {
                            variant: "error",
                        },
                    );
                    navigate("/");
                    return;
                }

                const gameBoard = {
                    ...docSnap.data(),
                    id: docSnap.id,
                } as Game.RawGameBoard;
                const gbImageRef = ref(storage, gameBoard.url);
                const url = await getDownloadURL(gbImageRef);
                gameBoard.url = url;

                const charactersSnap = await getDocs(charactersColRef);
                const characters: Game.Character[] = [];
                charactersSnap.forEach((doc) => {
                    const data = doc.data() as Game.RawCharacter;
                    const loc: Game.Coordinates = {
                        coordX: data.coordX,
                        coordY: data.coordY,
                    };

                    characters.push({
                        id: doc.id,
                        loc,
                        name: data.name,
                        url: data.url,
                        found: false,
                    });
                });

                const characterImages = await Promise.all(
                    characters.map((char) => {
                        const imageRef = ref(storage, char.url);
                        return getDownloadURL(imageRef);
                    }),
                );
                characterImages.forEach(
                    (url, idx) =>
                        (characters[idx].url = generateImageKitURL(url)),
                );

                const levelData: Game.GameBoard = {
                    ...gameBoard,
                    characters,
                };

                setLevel(levelData);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [boardId, navigate, enqueueSnackbar]);

    // Start Time
    useEffect(() => {
        startTimer();
    }, [startTimer]);

    // End Game if All Characters Found
    useEffect(() => {
        if (!level || level.characters.length === 0) return;

        const allFound = level.characters.every((char) => char.found);

        if (rawSeconds < MAX_TIME_LIMIT && !allFound) return;

        pauseTimer();
        if (!allFound) {
            enqueueSnackbar(
                <>
                    Game Closed Automatically after 1 hour.
                    <br />
                    Either You are Too Slow or "Someone" forgot to close the
                    Game.
                </>,
                {
                    variant: "info",
                    persist: true,
                    action: (snackbarId) => (
                        <SnackbarAction snackbarId={snackbarId} />
                    ),
                },
            );
            navigate("/");
            return;
        }
        setShowUsernameDialog(true);
    }, [level, pauseTimer, rawSeconds, enqueueSnackbar, navigate]);

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
        const docRef = doc(db, "game-boards", boardId);
        const scoresColRef = collection(docRef, "scores");

        try {
            await addDoc(scoresColRef, {
                name: username,
                completedIn: rawSeconds,
                achievedOn: serverTimestamp(),
            });
            enqueueSnackbar(`Score Submitted for Player: "${username}"!`, {
                variant: "success",
            });
            navigateToLeaderBoard();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUsernameSubmitCancel = () => {
        enqueueSnackbar("You cancelled the Score Submission!", {
            variant: "info",
        });
        navigateToLeaderBoard();
    };

    const navigateToLeaderBoard = () => {
        navigate(`/leader-board`, {
            state: { boardId },
        });
    };

    if (!level) {
        return null;
    }

    const charactersToFind = level.characters.filter((char) => !char.found);

    return (
        <Box>
            <GameHeader
                characters={level.characters}
                time={{ minutes, seconds }}
            />

            <Box
                sx={{
                    "& > img": {
                        width: "100%",
                    },
                }}
            >
                <ImageKitImg src={level.url} alt="" onClick={handleClick} />
            </Box>

            {charactersToFind.length !== 0 && (
                <Popover
                    open={showMenuDialog}
                    onClose={toggleMenuDialog}
                    disableEnforceFocus
                    anchorPosition={{
                        top: dialogPosition.y + 0.5,
                        left: dialogPosition.x,
                    }}
                    anchorReference="anchorPosition"
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <SelectionMenu
                        characters={charactersToFind}
                        onClick={handleMenuSelection}
                    />
                </Popover>
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
