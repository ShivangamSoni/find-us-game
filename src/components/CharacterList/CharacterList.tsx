import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import QuestionMark from "@mui/icons-material/QuestionMark";
import Done from "@mui/icons-material/Done";

import ImageKitImg from "../ImageKitImg/ImageKitImg";

interface Props {
    characters: Game.Character[];
}

export default function CharacterList({ characters }: Props) {
    return (
        <>
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
                {characters.map(({ id, name, url, found }) => (
                    <ImageListItem
                        key={id}
                        sx={{
                            "height": "inherit !important",
                            "& > img": {
                                objectFit: "contain !important",
                                height: "100% !important",
                            },
                        }}
                    >
                        <ImageKitImg src={url} alt="" />
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
        </>
    );
}
