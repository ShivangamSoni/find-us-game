import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";

import type { PaletteMode } from "@mui/material";
import { SiteColors } from "../Theme/colors";

interface ThemeState {
    mode: PaletteMode;
    color: SiteColors;
}

const storedTheme = JSON.parse(localStorage.getItem("theme") || "null");

const initialState: ThemeState = storedTheme || {
    mode: "dark",
    color: "red",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeThemeMode: (state, action: PayloadAction<PaletteMode>) => {
            state.mode = action.payload;
        },
        toggleThemeMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        },
        changeThemeColor: (state, action: PayloadAction<SiteColors>) => {
            state.color = action.payload;
        },
    },
});

export const { changeThemeMode, toggleThemeMode, changeThemeColor } =
    themeSlice.actions;

export default themeSlice.reducer;

export const userThemeMiddleware: Middleware = (store) => {
    return (next) => {
        return (action) => {
            if (action.type.match("theme/")) {
                let { color, mode } = store.getState().theme;

                if (action.type.match("theme/changeThemeColor")) {
                    color = action.payload;
                } else if (action.type.match("theme/changeThemeMode")) {
                    mode = action.payload;
                } else if (action.type.match("theme/toggleThemeMode")) {
                    mode = mode === "dark" ? "light" : "dark";
                }

                localStorage.setItem(
                    "theme",
                    JSON.stringify({
                        mode,
                        color,
                    }),
                );
            }

            next(action);
        };
    };
};
