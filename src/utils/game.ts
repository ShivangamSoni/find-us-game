export function getCoordinates(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
) {
    const coordX = parseFloat(
        (
            (e.nativeEvent.offsetX /
                (e.nativeEvent.target as HTMLImageElement).offsetWidth) *
            100
        ).toFixed(2),
    );

    const coordY = parseFloat(
        (
            (e.nativeEvent.offsetY /
                (e.nativeEvent.target as HTMLImageElement).offsetHeight) *
            100
        ).toFixed(2),
    );

    return { coordX, coordY };
}

export function verifyLocation({
    selectedLocation,
    characterLocation,
}: {
    selectedLocation: Game.Coordinates;
    characterLocation: Game.Coordinates;
}) {
    return (
        selectedLocation.coordX >= characterLocation.coordX - 2 &&
        selectedLocation.coordX <= characterLocation.coordX + 2 &&
        selectedLocation.coordY >= characterLocation.coordY - 2 &&
        selectedLocation.coordY <= characterLocation.coordY + 2
    );
}
