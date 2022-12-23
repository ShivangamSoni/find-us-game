import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/material/styles";

import { useGameCtx } from "../../Context/GameContext";

const clockTileStyle = {
    display: "grid",
    placeItems: "center",
    padding: "1rem 1.2rem",
    borderRadius: "0.3rem",
    color: "#3e087d",
    backgroundColor: "#f5e0ff",
};

const blink = keyframes`
    to {
        opacity: 0;
    }
`;

const clockColonStyle = {
    padding: 0,
    fontWeight: "900",
    fontSize: "2rem",
    animation: `${blink} 1000ms infinite linear`,
};

export default function Timer() {
    const {
        time: { seconds, minutes },
    } = useGameCtx();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Box sx={clockTileStyle}>
                <Typography component="span" variant="h3">
                    {minutes}
                </Typography>
                <Typography component="span" variant="subtitle2">
                    Minutes
                </Typography>
            </Box>
            <Box sx={clockColonStyle}>
                <Typography component="span" variant="h4">
                    :
                </Typography>
            </Box>
            <Box sx={clockTileStyle}>
                <Typography component="span" variant="h3">
                    {seconds}
                </Typography>
                <Typography component="span" variant="subtitle2">
                    Seconds
                </Typography>
            </Box>
        </Box>
    );
}
