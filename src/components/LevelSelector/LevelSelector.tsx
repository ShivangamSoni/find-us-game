import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import PlayIcon from "@mui/icons-material/PlayArrow";

interface Props {
    levels: Game.RawGameBoard[];
    onSelect: (id: string) => void;
}

export default function LevelSelector({ levels, onSelect }: Props) {
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <ImageList
            variant={match ? "standard" : "woven"}
            gap={8}
            sx={{
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr) !important",
                    sm: "repeat(3, 1fr) !important",
                    md: "repeat(4, 1fr) !important",
                },
            }}
        >
            {levels.map(({ id, url, title }) => (
                <ImageListItem key={id}>
                    <img src={url} alt="" />
                    <ImageListItemBar
                        title={title}
                        position="top"
                        actionIcon={
                            <IconButton
                                title={`Play Level: ${title}`}
                                size="small"
                                color="warning"
                                sx={{ backgroundColor: "white", mr: 1 }}
                                onClick={() => onSelect(id as string)}
                            >
                                <PlayIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
