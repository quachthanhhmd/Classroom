import { IPaginationInfo } from './';


export interface IUserCourse {
    courses: ICourseSummary[],
    pagination: IPaginationInfo,
}

export interface IUserCourseState {
    type: string,
    payload?: IUserCourse,
}


export interface ICourseSummary {
    id: number,
    name: number,
    topic: number,
    avatarUrl: string,
}


export interface ICourseInfo {
    id: number,
    name: string,
    description: string,
    topic: string,
    avatarUrl: string,
    backgroundUrl: string,
    code: string,
    studentExist: number,
    studentLimit: number,
}

//-------------------------------------

export interface ICreateCourse {
    name: string,
    description: string,
    studentLimit: number,
    topic: string,
}

export interface ICreateCourseState {
    type: string,
    payload?: ICourseSummary,
}

export interface ICourseInfoState {
    type: string,
    payload?: ICourseInfo;
}

export interface IJoinCourseByCode {
    code: string,
}

export interface IJoinCodeState {
    type: string,
    payload?: ICourseInfo,
}

export interface IJoinCourseByUrlState {
    type: string,
    payload?: any,
}

export interface IJoinCourseByUrlResponse {

}

export interface IMemberInfoSummary {
    firstName: string,
    lastName: string,
    userId: number,
    avatarUrl: string,
}

export interface IMemberSummary {
    memberId: number,
    type: string,
    role: string,
    user: IMemberInfoSummary
}

export interface ICourseMemberState {
    type: string,
    payload?: IMemberSummary[],
}

//----------------------------------------------------------------
export interface IInviteByTokenState {
    type: string,
    payload?: any,
}
export type ICourseAction = IInviteByTokenState | ICourseMemberState | ICreateCourseState | IUserCourseState | ICourseInfoState | IJoinCodeState | IJoinCourseByUrlState;