import themeModeReducer  from "./theme-mode.reducer";

import { combineReducers } from "redux";

export const reducer = combineReducers({
    themeMode: themeModeReducer,
});


export type AppState = ReturnType<typeof reducer>;