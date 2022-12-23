import { MouseEventHandler, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";

import { useGameCtx } from "../../Context/GameContext";

import Timer from "../../components/Timer/Timer";

// Static Data [TODO: Get Data from Firestore]
import levelData from "../../StaticData/level";

export default function Game() {
    const { startGame } = useGameCtx();
    const [level, setLevel] = useState<Game.GameBoard>(levelData);

    useEffect(() => {
        startGame();
    }, []);

    const handleClick: MouseEventHandler<HTMLImageElement> = (e) => {
        console.log(e.nativeEvent.offsetX);
        console.log(e.nativeEvent.offsetY);
    };

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
        </Box>
    );
}
