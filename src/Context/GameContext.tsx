import { ReactNode, useCallback, useEffect } from "react";
import { createContext, useContext } from "react";

import { useStopwatch } from "react-timer-hook";

interface StateShape {
    time: {
        seconds: number;
        minutes: number;
    };
    endGame: () => void;
    startGame: () => void;
}

const defaultState = {
    time: {
        seconds: 0,
        minutes: 0,
    },
    startGame: () => {},
    endGame: () => {},
};

const GameContext = createContext<StateShape>(defaultState);

interface Props {
    children: ReactNode;
}

export default function GameProvider({ children }: Props) {
    const { seconds, minutes, start, reset } = useStopwatch({
        autoStart: false,
    });

    const time = { seconds, minutes };

    const startGame = useCallback(() => {
        start();
    }, [start]);

    const endGame = useCallback(() => {
        reset();
    }, [reset]);

    return (
        <GameContext.Provider value={{ time, startGame, endGame }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGameCtx = () => useContext(GameContext);
