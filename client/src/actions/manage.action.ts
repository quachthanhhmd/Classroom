import { DELETE_MESSAGE } from "../constants";

export const deleteMessage = () =>
    async (dispatch: (args: any) => any) => {
        dispatch({
            type: DELETE_MESSAGE,
        })
    }