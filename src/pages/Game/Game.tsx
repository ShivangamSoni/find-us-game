import { MouseEventHandler } from "react";

import Box from "@mui/material/Box";

export default function Game() {
    const handleClick: MouseEventHandler<HTMLImageElement> = (e) => {
        console.log(e.nativeEvent.offsetX);
        console.log(e.nativeEvent.offsetY);
    };

    return (
        <Box>
            {/* TODO: ADD Game Header */}
            <Box
                sx={{
                    "& > img": {
                        width: "100%",
                    },
                }}
            >
                <img
                    src={require("../../Assets/smaple.jpg")}
                    alt=""
                    onClick={handleClick}
                />
            </Box>
        </Box>
    );
}
