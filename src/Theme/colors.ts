import {
    orange,
    deepOrange,
    purple,
    deepPurple,
    lightBlue,
    lightGreen,
    green,
    blue,
    red,
    amber,
} from "@mui/material/colors";

export const COLORS = {
    orange,
    deepOrange,
    purple,
    deepPurple,
    lightBlue,
    lightGreen,
    green,
    blue,
    red,
    amber,
};

export type SiteColors = keyof typeof COLORS;

export const COLOR_OPTIONS = Object.entries(COLORS).map(([key, value]) => {
    return {
        key: crypto.randomUUID(),
        label: key.toUpperCase(),
        value: key,
        sx: {
            "color": value[800],
            "&.Mui-checked": {
                color: value[600],
            },
        },
    };
});
