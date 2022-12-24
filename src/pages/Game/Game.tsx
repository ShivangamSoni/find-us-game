import { MouseEventHandler, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

import QuestionMark from "@mui/icons-material/QuestionMark";
import Done from "@mui/icons-material/Done";

import { useGameCtx } from "../../Context/GameContext";

import Timer from "../../components/Timer/Timer";

// Static Data [TODO: Get Data from Firestore]
import levelData from "../../StaticData/level";
import { getCoordinates, verifyLocation } from "../../utils/game";

import SelectionMenu from "../../components/SelectionMenu/SelectionMenu";
import { DialogTitle, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

export default function Game() {
    const { enqueueSnackbar } = useSnackbar();
    const {
        time: { seconds, minutes },
        startGame,
        endGame,
    } = useGameCtx();
    const [level, setLevel] = useState<Game.GameBoard>(levelData);
    const [selectedLocation, setSelectedLocation] = useState<Game.Coordinates>({
        coordX: 0,
        coordY: 0,
    });
    const [showMenuDialog, setShowMenuDialog] = useState(false);
    const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        const allFound = level.characters.every((char) => char.found);

        if (allFound) {
            const timeTaken = `${minutes} : ${seconds}`;
            endGame();

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
                    gap: 2,
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <Typography variant="h5" component="h2">
                        Find These Characters
                    </Typography>
                    <ImageList
                        sx={{
                            height: 200,
                            gridTemplateColumns: {
                                xs: "repeat(2, 1fr) !important",
                                sm: "repeat(3, 1fr) !important",
                                md: "repeat(4, 1fr) !important",
                            },
                        }}
                    >
                        {level.characters.map(({ name, url, found }) => (
                            <ImageListItem
                                key={name}
                                sx={{
                                    "height": "inherit !important",
                                    "& > img": {
                                        objectFit: "contain !important",
                                        height: "100% !important",
                                    },
                                }}
                            >
                                <img src={url} alt={name} loading="lazy" />
                                <ImageListItemBar
                                    title={name}
                                    subtitle={found ? "Found" : "Not Found"}
                                    position="bottom"
                                    actionIcon={
                                        <IconButton
                                            size="small"
                                            color={found ? "success" : "error"}
                                            sx={{
                                                backgroundColor: "white",
                                                mr: 1,
                                            }}
                                            disableRipple
                                        >
                                            {found ? (
                                                <Done fontSize="small" />
                                            ) : (
                                                <QuestionMark fontSize="small" />
                                            )}
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>

                <Box>
                    <Timer />
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
