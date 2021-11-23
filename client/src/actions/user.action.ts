import userApi from "../api/user.api";
import {
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from "../constants";
import { IChangePassword, IPasswordState, IProfileBody, IProfileState } from "../interfaces";

export const updateProfile = (data: IProfileBody) =>
    async (dispatch: (args: IProfileState) => (IProfileState)) => {
        try {
            dispatch({
                type: UPDATE_PROFILE_REQUEST
            });
            const result = await userApi.updateProfile(data);

            if (result.status !== 200) throw new Error();

            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: result.data.payload,
            });
        } catch (err) {
            dispatch({
                type: UPDATE_PROFILE_FAIL
            })
        }
    }

export const updatePassword = (data: IChangePassword) => 
    async (dispatch: (args: IPasswordState) => (IPasswordState)) => {
        try {
            dispatch({
                type: UPDATE_PASSWORD_REQUEST
            })

            const result = await userApi.updatePassword(data);

            if (result.data.code !== 200) throw new Error();

            dispatch({
                type: UPDATE_PASSWORD_SUCCESS
            })

        } catch(err) {
            dispatch({
                type: UPDATE_PASSWORD_FAIL
            })
        }
    }