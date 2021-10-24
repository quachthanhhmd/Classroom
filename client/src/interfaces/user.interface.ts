import { ICourseSummary, IPaginationInfo } from './';


export interface IUserCourse {
    courses: ICourseSummary[],
    pagination: IPaginationInfo,
}

export interface IUserCourseState  {
    type: string,
    payload?: IUserCourse,
}

export type IUserAction = IUserCourseState;