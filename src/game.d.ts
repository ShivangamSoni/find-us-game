declare namespace Game {
    interface Coordinates {
        coordX: number;
        coordY: number;
    }
    interface Character {
        id: string;
        found: boolean;
        name: string;
        url: string;
        loc: Coordinates;
    }

    interface GameBoard {
        id: string;
        title: string;
        url: string;
        characters: Character[];
    }
    interface RawCharacter {
        name: string;
        url: string;
        coordX: number;
        coordY: number;
    }
    interface RawGameBoard {
        id: string;
        title: string;
        url: string;
    }
}
