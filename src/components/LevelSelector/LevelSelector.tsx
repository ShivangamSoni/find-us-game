import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

interface Props {
    levels: Game.RawGameBoard[];
    onSelect: (id: string) => void;
    ActionIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    actionTitleStart: string;
    fullScreen?: boolean;
}

export default function LevelSelector({
    levels,
    onSelect,
    ActionIcon,
    actionTitleStart,
    fullScreen = true,
}: Props) {
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <ImageList
            variant={match ? "standard" : "woven"}
            gap={8}
            sx={{
                height: fullScreen ? "100%" : 350,
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr) !important",
                    sm: "repeat(3, 1fr) !important",
                    md: "repeat(4, 1fr) !important",
                },
            }}
        >
            {levels.map(({ id, url, title }) => (
                <ImageListItem
                    key={id}
                    sx={
                        !fullScreen
                            ? {
                                  "height": "inherit !important",
                                  "& > img": {
                                      height: "100% !important",
                                  },
                              }
                            : {}
                    }
                >
                    <img src={url} alt="" />
                    <ImageListItemBar
                        title={title}
                        position="top"
                        actionIcon={
                            <IconButton
                                title={`${actionTitleStart}: ${title}`}
                                size="small"
                                color="warning"
                                sx={{ backgroundColor: "white", mr: 1 }}
                                onClick={() => onSelect(id as string)}
                            >
                                <ActionIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
