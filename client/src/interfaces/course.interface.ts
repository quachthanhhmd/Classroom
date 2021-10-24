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

export type ICourseAction = ICreateCourseState | IUserCourseState;