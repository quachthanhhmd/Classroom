export interface IInviteMember {
    email: string,
}

//------------------------------------------------------------------------------
export interface IUpsertStudentID {
    studentId: string,
}

export interface IUpsertStudentIdState {
    type: string,
    payload?: IUpsertStudentID,
}

export interface IUpsertStudentIDBody {
    studentId: string,
    userId: number,
    courseId: number,
}

export interface IGetRoleMemberState {
    type: string,
    payload?: IRoleMemberResponse,
}

export interface IRoleMemberResponse {
    role: string,
    type: string,
    studentId?: string,
}

export interface IInviteMemberState {
    type: string,
    payload?: any,
}

export type IMemberAction = IUpsertStudentIdState | IGetRoleMemberState | IInviteMemberState;