import type { MouseEventHandler } from "react";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";

import Timer from "../../components/Timer/Timer";

export default function Game() {
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
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <ImageListItem
                                sx={{
                                    "height": "inherit !important",
                                    "& > img": {
                                        objectFit: "contain !important",
                                        height: "100% !important",
                                    },
                                }}
                            >
                                <img
                                    src={require("../../Assets/smaple.jpg")}
                                    alt=""
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title="Mario"
                                    subtitle="Not Found"
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
                <img
                    src={require("../../Assets/smaple.jpg")}
                    alt=""
                    onClick={handleClick}
                />
            </Box>
        </Box>
    );
}
