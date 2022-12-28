import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import ImageKitImg from "../ImageKitImg/ImageKitImg";

interface Props {
    characters: Game.Character[];
}

export default function CharacterList({ characters }: Props) {
    return (
        <ImageList
            sx={{
                m: 0,
                px: 0.5,
                height: 150,
                gridTemplateColumns:
                    "repeat(auto-fill, minmax(250px, 1fr)) !important",
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
                        sx={{
                            "backgroundColor": "rgba(0, 0, 0, .8)",
                            "& > *": {
                                py: 0.5,
                                px: 2,
                            },
                        }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
