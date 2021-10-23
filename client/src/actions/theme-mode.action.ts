import { UPDATE_MODE } from "../constants";
import { IThemeMode } from "../interfaces";

export const updateThemeMode = (data: IThemeMode) => {

    return {
        type: UPDATE_MODE,
        payload: data,
    }
}

