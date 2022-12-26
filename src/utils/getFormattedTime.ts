export function getFormattedTime({
    minutes,
    seconds,
}: {
    minutes: number;
    seconds: number;
}) {
    return [minutes, seconds]
        .map((s) => s.toString().padStart(2, "0"))
        .join(":");
}
