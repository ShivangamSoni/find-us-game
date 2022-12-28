import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CharacterList from "../CharacterList/CharacterList";
import Timer from "../Timer/Timer";

type Props = React.ComponentProps<typeof CharacterList> & {
    time: React.ComponentProps<typeof Timer>;
};

export default function GameHeader({ characters, time }: Props) {
    return (
        <Paper
            component="header"
            elevation={5}
            square
            sx={{
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
                py: 1,
            }}
        >
            <Box sx={{ width: "100%" }}>
                <CharacterList characters={characters} />
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 99,
                    m: 0.5,
                }}
            >
                <Timer {...time} />
            </Box>
        </Paper>
    );
}
