import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    gameBoards: Game.RawGameBoard[];
}

const initialState: GameState = {
    gameBoards: [],
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGameBoards: (state, action: PayloadAction<Game.RawGameBoard[]>) => {
            state.gameBoards = action.payload;
        },
    },
});

export const { setGameBoards } = gameSlice.actions;

export default gameSlice.reducer;
