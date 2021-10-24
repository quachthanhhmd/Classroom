import themeModeReducer  from "./theme-mode.reducer";
import courseManageReducer from "./course-manage.reducer";
import authReducer from "./auth.reducer";
import { combineReducers } from "redux";

export const reducer = combineReducers({
    themeMode: themeModeReducer,
    courseManage: courseManageReducer,
    auth: authReducer,
});


export type AppState = ReturnType<typeof reducer>;