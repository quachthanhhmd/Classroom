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

export type ICourseAction = ICreateCourseState | IUserCourseState | ICourseInfoState;