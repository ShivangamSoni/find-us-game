import { MouseEventHandler, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { useSnackbar } from "notistack";

// Static Data [TODO: Get Data from Firestore]
import levelData from "../../StaticData/level";

import { useTimer } from "../../hooks/useTimer";
import { getCoordinates, verifyLocation } from "../../utils/game";

import CharacterList from "../../components/CharacterList/CharacterList";
import Timer from "../../components/Timer/Timer";
import SelectionMenu from "../../components/SelectionMenu/SelectionMenu";

export default function Game() {
    const { enqueueSnackbar } = useSnackbar();
    const {
        time: { minutes, seconds },
        startTimer,
        pauseTimer,
    } = useTimer();

    const [level, setLevel] = useState<Game.GameBoard>(levelData);
    const [selectedLocation, setSelectedLocation] = useState<Game.Coordinates>({
        coordX: 0,
        coordY: 0,
    });
    const [showMenuDialog, setShowMenuDialog] = useState(false);
    const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        startTimer();
    }, []);

    useEffect(() => {
        const allFound = level.characters.every((char) => char.found);

        if (allFound) {
            const timeTaken = `${minutes} : ${seconds}`;
            pauseTimer();

            console.log(timeTaken);
        }
    }, [level, seconds, minutes]);

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

    const handleMenuSelection = (name: string) => {
        const selectedCharacter = level.characters.find(
            (char) => char.name === name,
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

    const charactersToFind = level.characters.filter((char) => !char.found);

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
        </Box>
    );
}
