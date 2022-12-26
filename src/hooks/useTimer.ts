import { useCallback, useEffect, useRef, useState } from "react";
import { getTimeFromSeconds } from "../utils/getTimeFromSecs";

export function useTimer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalId = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (isRunning) {
            intervalId.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(intervalId.current);
        }

        return () => clearInterval(intervalId.current);
    }, [isRunning]);

    const time = getTimeFromSeconds(seconds);

    const startTimer = useCallback(() => setIsRunning(true), [setIsRunning]);
    const pauseTimer = useCallback(() => setIsRunning(false), [setIsRunning]);

    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setSeconds(0);
    }, [setIsRunning, setSeconds]);

    return { time, startTimer, pauseTimer, resetTimer, rawSeconds: seconds };
}
