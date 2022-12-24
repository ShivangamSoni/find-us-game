declare namespace Game {
    interface Coordinates {
        coordX: number;
        coordY: number;
    }
    interface Character {
        found: boolean;
        name: string;
        url: string;
        loc: Coordinates;
    }

    interface GameBoard {
        title: string;
        url: string;
        characters: Character[];
    }
}
