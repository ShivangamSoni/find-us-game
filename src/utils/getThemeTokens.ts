import type { PaletteMode, Color } from "@mui/material";

export const getThemeTokens = (mode: PaletteMode, color: Color) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  primary: {
                      main: color.A200,
                      light: color[50],
                  },
              }
            : {
                  primary: {
                      main: color.A200,
                      light: color[900],
                  },
              }),
    },
});
