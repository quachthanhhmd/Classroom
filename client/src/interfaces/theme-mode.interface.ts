import { UPDATE_MODE } from "../constants";

export interface IThemeMode {
    toggleMode: boolean;

}

export interface IThemeModeAction {
    type: typeof UPDATE_MODE,
    payload: IThemeMode
}


export type IThemeAction = IThemeModeAction;