export function getTimeFromSeconds(seconds: number) {
    return {
        minutes: Math.floor(seconds / 60),
        seconds: Math.floor(seconds % 60),
    };
}
