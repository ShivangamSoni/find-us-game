import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import ImageKitImg from "../ImageKitImg/ImageKitImg";

interface Props {
    levels: Game.RawGameBoard[];
    onSelect: (id: string) => void;
    ActionIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    actionTitleStart: string;
    fullScreen?: boolean;
    height?: string | number;
}

export default function LevelSelector({
    levels,
    onSelect,
    ActionIcon,
    actionTitleStart,
    fullScreen = true,
    height = "100%",
}: Props) {
    return (
        <Paper variant="elevation" elevation={5} sx={{ p: 1 }}>
            <ImageList
                variant="standard"
                gap={8}
                sx={{
                    height: height,
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr) !important",
                        sm: "repeat(3, 1fr) !important",
                        md: "repeat(4, 1fr) !important",
                    },
                    m: 0,
                }}
            >
                {levels.map(({ id, url, title }) => (
                    <ImageListItem
                        key={id}
                        sx={{
                            "height": "inherit !important",
                            "& > img": {
                                height: "100% !important",
                                objectFit: "cover",
                                ...(fullScreen
                                    ? {
                                          width: "100% !important",
                                      }
                                    : {}),
                            },
                        }}
                    >
                        <ImageKitImg src={url} alt="" />
                        <ImageListItemBar
                            title={title}
                            position="top"
                            actionIcon={
                                <IconButton
                                    title={`${actionTitleStart}: ${title}`}
                                    size="small"
                                    sx={{
                                        "mr": 1,
                                        "backgroundColor": "primary.main",
                                        "color": "primary.contrastText",
                                        "boxShadow": 3,

                                        "&:hover": {
                                            backgroundColor: "primary.light",
                                        },
                                    }}
                                    onClick={() => onSelect(id as string)}
                                >
                                    <ActionIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Paper>
    );
}
