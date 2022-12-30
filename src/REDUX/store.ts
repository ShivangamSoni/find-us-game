import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import themeSlice, { userThemeMiddleware } from "./themeSlice";

const store = configureStore({
    reducer: {
        game: gameSlice,
        theme: themeSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userThemeMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
