import { NOTIFICATION_SUCCESS, NOTIFICATION_FAIL, CLOSE_NOTIFICATION } from "../constants";
import { INotiReducer } from "../interfaces";

const initialState: INotiReducer = {
    open: false,
    message: '',
    state: 'success',
};


const notifyReducer = (state = initialState, action) => {

    switch (action.type) {
        case NOTIFICATION_SUCCESS:
            return {
                ...state,
                open: true,
                message: action.payload,
                state: "success",
            }
        case NOTIFICATION_FAIL:
            return {
                ...state,
                open: true,
                message: action.payload,
                state: "error",
            }
        case CLOSE_NOTIFICATION:
            return {
                ...state,
                open: false,
                message: "",
            }
        default:
            return {
                ...state,
            }
    }
}

export default notifyReducer;