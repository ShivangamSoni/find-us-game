import { MouseEventHandler } from "react";

export default function Game() {
    const handleClick: MouseEventHandler<HTMLImageElement> = (e) => {
        console.log(e.nativeEvent.offsetX);
        console.log(e.nativeEvent.offsetY);
    };

    return (
        <>
            <h1>Game</h1>
            <img
                src={require("../../Assets/smaple.jpg")}
                alt=""
                onClick={handleClick}
            />
        </>
    );
}
