import { ChangeEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeThemeColor, toggleThemeMode } from "../../REDUX/themeSlice";
import { COLOR_OPTIONS, SiteColors } from "../../Theme/colors";

import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import PaletteIcon from "@mui/icons-material/Palette";
import CloseIcon from "@mui/icons-material/Close";

export default function ThemeChanger() {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { mode, color } = useAppSelector((state) => state.theme);

    const handleToggle = () => dispatch(toggleThemeMode());
    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeThemeColor(e.target.value as SiteColors));

    return (
        <>
            <Fab
                size="small"
                title="Choose Site Theme"
                sx={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    zIndex: 9999,
                    m: 2,
                    backgroundColor: "primary.main",
                }}
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? <CloseIcon /> : <PaletteIcon />}
            </Fab>

            <Drawer
                open={open}
                keepMounted={false}
                onClose={() => setOpen((prev) => !prev)}
                sx={{
                    "& .MuiBackdrop-root": {
                        opacity: "0.25 !important",
                    },
                }}
            >
                <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                        p: 2,
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    Site Customizations
                </Typography>
                <Divider />

                <List sx={{ width: 250 }}>
                    <ListItem
                        sx={{
                            justifyContent: "center",
                        }}
                    >
                        <ModeSwitch
                            size="medium"
                            checked={mode === "light"}
                            onChange={handleToggle}
                            title={`Toggle Mode to ${
                                mode === "dark" ? "Light" : "Dark"
                            }`}
                        />
                    </ListItem>
                    <ListItem
                        sx={{
                            width: "100%",
                            display: "grid",
                            justifyContent: "stretch",
                        }}
                    >
                        <ListItemText primary="Color Palette" />
                        <Divider />
                        <RadioGroup
                            name="site-theme-color"
                            value={color}
                            onChange={handleColorChange}
                        >
                            {COLOR_OPTIONS.map(({ key, label, ...props }) => (
                                <FormControlLabel
                                    key={key}
                                    control={<Radio {...props} size="small" />}
                                    label={label}
                                    labelPlacement={"start"}
                                    sx={{
                                        justifyContent: "start",
                                    }}
                                />
                            ))}
                        </RadioGroup>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

const ModeSwitch = styled(Switch)(({ theme }) => ({
    "width": 75,
    "height": 32,
    "padding": 7,
    "& .MuiSwitch-switchBase": {
        "margin": 0,
        "padding": 0,
        "transform": "translateX(5px)",
        "&.Mui-checked": {
            "color": "#fff",
            "transform": "translateX(40px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff",
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        "backgroundColor":
            theme.palette.mode === "dark" ? "#003892" : "#001e3c",
        "width": 30,
        "height": 30,
        "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                "#fff",
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    "& .MuiSwitch-track": {
        opacity: 0.6,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        borderRadius: 20 / 2,
    },
}));
