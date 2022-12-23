declare namespace Game {
    interface Character {
        coordX: string;
        coordY: string;
        found: boolean;
        name: string;
        url: string;
    }

    interface GameBoard {
        title: string;
        url: string;
        characters: Character[];
    }
}
