import n64Board from "../assets/boards/n64.jpg";

import luigi from "../assets/characters/luigi.png";
import conker from "../assets/characters/conker.png";
import bobomb from "../assets/characters/bobomb.png";

const levelData: Game.GameBoard = {
    title: "N64",
    url: n64Board,
    characters: [
        {
            name: "Luigi",
            found: false,
            coordX: "76",
            coordY: "48",
            url: luigi,
        },
        {
            name: "Conker",
            found: false,
            coordX: "39",
            coordY: "58",
            url: conker,
        },
        {
            name: "Bobomb",
            found: false,
            coordX: "74",
            coordY: "60",
            url: bobomb,
        },
    ],
};

export default levelData;
