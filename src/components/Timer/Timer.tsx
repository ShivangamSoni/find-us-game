import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme, keyframes } from "@mui/material/styles";

const blink = keyframes`
    to {
        opacity: 0;
    }
`;

const clockColonStyle = {
    animation: `${blink} 1000ms infinite linear`,
};

interface Props {
    minutes: number;
    seconds: number;
}

export default function Timer({ minutes, seconds }: Props) {
    const {
        palette: { mode },
    } = useTheme();

    const dark = mode === "dark";

    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                borderRadius: "100vmax",
                py: 0.5,
                px: 2,
                width: "max-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* For Screen Readers */}
            <Typography sx={{ fontSize: 0 }}>Elapsed Time:</Typography>
            <Box
                component="time"
                dateTime={`${minutes}:${seconds}`}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.5,
                    color: dark ? "primary.light" : "",
                }}
            >
                <Typography component="span" variant="h6">
                    {minutes.toString().padStart(2, "0")}
                </Typography>
                <Typography
                    component="span"
                    variant="h6"
                    sx={clockColonStyle}
                    aria-hidden="true"
                >
                    :
                </Typography>
                <Typography component="span" variant="h6">
                    {seconds.toString().padStart(2, "0")}
                </Typography>
            </Box>
        </Box>
    );
}
