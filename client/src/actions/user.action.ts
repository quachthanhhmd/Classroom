import userApi from "../api/user.api";
import {
    NOTIFICATION_FAIL,
    NOTIFICATION_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from "../constants";
import { IChangePassword, IPasswordState, IProfileBody, IProfileState } from "../interfaces";

export const updateProfile = (data: IProfileBody) =>
    async (dispatch) => {
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
            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: "Cập nhật thông tin thành công"
            })
        } catch (err) {
            dispatch({
                type: NOTIFICATION_FAIL,
                payload: "Cập nhật thông tin không thành công"
            })
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
            
            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: "Cập nhật thông tin thành công"
            })

        } catch(err) {
            dispatch({
                type: NOTIFICATION_FAIL,
                payload: "Cập nhật thông tin không thành công"
            })
            dispatch({
                type: UPDATE_PASSWORD_FAIL
            })
        }
    }