import { UPDATE_MEMBER_STATE_FAIL, UPDATE_MEMBER_STATE_SUCCESS } from './../constants/member.constant';
import memberApi from "../api/member.api";
import {
    GET_ROLE_MEMBER_FAIL,
    GET_ROLE_MEMBER_SUCCESS,
    INVITE_MEMBER_FAIL,
    INVITE_MEMBER_REQUEST,
    INVITE_MEMBER_SUCCESS,
    UPSERT_STUDENT_ID_FAIL,
    UPSERT_STUDENT_ID_REQUEST,
    UPSERT_STUDENT_ID_SUCCESS
} from "../constants/member.constant";
import {
    IInviteMemberState,
    IMemberAction,
    IUpdateMemberState
} from "../interfaces";
import { NOTIFICATION_FAIL, NOTIFICATION_SUCCESS } from '../constants';

export const upsertStudentId = (courseId: number, studentId: string) =>
    async (dispatch) => {
        try {
            dispatch({
                type: UPSERT_STUDENT_ID_REQUEST
            });
            const result = await memberApi.upsertStudentId(courseId, studentId);

            if (result.status !== 200) throw new Error();

            dispatch({
                type: UPSERT_STUDENT_ID_SUCCESS
            })

            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: "Cập nhật mã số sinh viên thành công",
            })

        } catch (err) {
            dispatch({
                type: UPSERT_STUDENT_ID_FAIL,
            })
            dispatch({
                type: NOTIFICATION_FAIL,
                payload: "Cập nhật mã số sinh viên không thành công",
            })
        }
    }

export const getRoleMember = (courseId: number) =>
    async (dispatch: (args: IMemberAction) => IMemberAction) => {
        try {
            const result = await memberApi.getMemberRole(courseId);
            if (result.status !== 200) throw new Error();

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

export const inviteMemberByEmail = (courseId: number, email: string, role: string,) =>
    async (dispatch: (args: IInviteMemberState) => IInviteMemberState) => {
        try {
            dispatch({
                type: INVITE_MEMBER_REQUEST,
            })

            const result = await memberApi.inviteMemberByEmail(courseId, email, role);
            if (result.status !== 200) throw new Error();
            dispatch({
                type: INVITE_MEMBER_SUCCESS,
            })
            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: "Gửi email thành công.",
            })
        } catch (err) {
            dispatch({
                type: INVITE_MEMBER_FAIL
            })
            dispatch({
                type: NOTIFICATION_FAIL,
                payload: "Gửi email thất bại, vui lòng thử lại sau.",
            })
        }
    }

export const updateStateMember = (userId: number, courseId: number, state: string) =>
    async (dispatch: (args: IUpdateMemberState) => IUpdateMemberState) => {
        try {
            const result = await memberApi.updateMemberState(userId, courseId, state);
            if (result.status !== 200) throw new Error();

            dispatch({
                type: UPDATE_MEMBER_STATE_SUCCESS,
                payload: result.data.payload,
            })
        }catch (err) {
            dispatch({
                type: UPDATE_MEMBER_STATE_FAIL
            })
        }
    }
