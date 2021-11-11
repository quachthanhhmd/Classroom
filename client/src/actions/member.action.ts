import memberApi from "../api/member.api";
import { GET_ROLE_MEMBER_FAIL, GET_ROLE_MEMBER_SUCCESS, UPSERT_STUDENT_ID_FAIL, UPSERT_STUDENT_ID_REQUEST, UPSERT_STUDENT_ID_SUCCESS } from "../constants/member.constant";
import {
    IMemberAction, IUpsertStudentIDBody
} from "../interfaces";

export const upsertStudentId = (courseId: number, studentId: string) =>
    async (dispatch: (args: IMemberAction) => IMemberAction) => {
        try {
            dispatch({
                type: UPSERT_STUDENT_ID_REQUEST
            });
            const result = await memberApi.upsertStudentId(courseId, studentId);

            if (result.status !== 200) throw new Error();

            dispatch({
                type: UPSERT_STUDENT_ID_SUCCESS
            })

        } catch (err) {
            dispatch({
                type: UPSERT_STUDENT_ID_FAIL,
            })
        }
    }

export const getRoleMember = (courseId: number) =>
    async (dispatch: (args: IMemberAction) => IMemberAction) => {
        try {
            const result = await memberApi.getMemberRole(courseId);
            if (result.status !== 200) throw new Error();
            console.log(result.data.payload);
            dispatch({
                type: GET_ROLE_MEMBER_SUCCESS,
                payload: result.data.payload,
            })
        } catch (err) {
            dispatch({
                type: GET_ROLE_MEMBER_FAIL,
            })
        }
    }
