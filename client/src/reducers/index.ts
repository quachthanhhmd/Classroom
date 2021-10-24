import themeModeReducer  from "./theme-mode.reducer";
import courseManageReducer from "./course-manage.reducer";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import courseReducer from "./course.reducer";

import { combineReducers } from "redux";

export const reducer = combineReducers({
    themeMode: themeModeReducer,
    courseManage: courseManageReducer,
    auth: authReducer,
    course: courseReducer,
});


export type AppState = ReturnType<typeof reducer>;