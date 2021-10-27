import userApi from "../api/user.api";
import {
    UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from "../constants";
import { IProfileBody, IProfileState } from "../interfaces";

export const updateProfile = async (data: IProfileBody) =>
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
