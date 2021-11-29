import { NOTIFICATION_SUCCESS, CLOSE_NOTIFICATION, NOTIFICATION_FAIL } from "../constants"

export const showSuccessNotify = (message: string) =>
    async (dispatch: any) => {

        dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: message
        })
    }

export const showErrorNotify = (message: string) =>
    async (dispatch: any) => {

        dispatch({
            type: NOTIFICATION_FAIL,
            payload: message
        })
    }


export const closeNotify = () =>
    async (dispatch: any) => {

        dispatch({
            type: CLOSE_NOTIFICATION,
        })
    }

