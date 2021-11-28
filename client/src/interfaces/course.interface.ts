import { IPaginationInfo } from './';
import { IChangeOrderState, ICreateExerciseType, ICreateExerciseTypeState, IExerciseTypeDetail, IUpdateExerciseTypeState } from './exercise.interface';


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
    ownerId: number,
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
    ownerId: number,
    exerciseTypeList?: IExerciseTypeDetail[]
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
    payload?: ICourseInfo,
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
    email: string
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
//----------------------------------------------------------------
export interface IUpdateCourseInfoState {
    type: string,
    payload?: any
}
export interface IUpdateCourseInput {
    name?: string,
    description?: string,
    studentLimit?: number,
    topic?: string,
    avatarUrl?: string,
    backgroundUrl?: string,
}

export type ICourseAction = IChangeOrderState | IUpdateCourseInfoState | IInviteByTokenState | ICourseMemberState | ICreateCourseState | IUserCourseState | ICourseInfoState | IJoinCodeState | IJoinCourseByUrlState | ICreateExerciseTypeState | IUpdateExerciseTypeState;