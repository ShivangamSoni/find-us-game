import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/material/styles";

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

interface Props {
    minutes: number;
    seconds: number;
}

export default function Timer({ minutes, seconds }: Props) {
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
                    {minutes.toString().padStart(2, "0")}
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
                    {seconds.toString().padStart(2, "0")}
                </Typography>
                <Typography component="span" variant="subtitle2">
                    Seconds
                </Typography>
            </Box>
        </Box>
    );
}
