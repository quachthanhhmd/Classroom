import { UPDATE_MODE } from "../constants";
import { IThemeMode, IThemeAction } from "../interfaces";

const initState: IThemeMode = {
    toggleMode: (window.localStorage.getItem("theme-mode") === "dark" ? false : true),
}

const themeModeReducer = (state = initState, action: IThemeAction) => {
    switch (action.type) {
        case UPDATE_MODE: {
            window.localStorage.setItem("theme-mode", (!state.toggleMode) ? "light" : "dark")
            return {
                toggleMode: !state.toggleMode,
            }
           
        }
        default:
            return {
               ...state,
            }
    }
}

export default themeModeReducer;