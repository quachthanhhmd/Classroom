import { IPaginationInfo } from './';
import { IChangeOrderState, ICreateExerciseTypeState, IDeleteExerciseTypeState, IExerciseThumbnail, IExerciseTypeDetail, IUpdateExerciseTypeState } from './exercise.interface';
import { IPostDetail } from './post.interface';
import { ITopicDetail } from './topic.interface';

export interface IGradeCourse {
    totalScore: number,
    totalMaxScore: number,
    scoreList: {
        id: number, 
        title: string,
        submissionId: number | null, 
        score: number,
        typeId: number,
        typeName: string
    }[]
}

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
    exerciseTypeList?: IExerciseTypeDetail[],
    topicList?: ITopicDetail[],
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
//----------------------------------------------------------------

export type IPostResponse = Array<IPostDetail | IExerciseThumbnail>;

export function isPostDetail(object: any): object is IPostDetail {
    return "content" in object;
}


export interface IPoseResponseState {
    type: string;
    payload?: IPostResponse
}

export type ICourseAction = IPoseResponseState | IChangeOrderState | IUpdateCourseInfoState | IInviteByTokenState | ICourseMemberState | ICreateCourseState | IUserCourseState | ICourseInfoState | IJoinCodeState | IJoinCourseByUrlState | ICreateExerciseTypeState | IUpdateExerciseTypeState | IDeleteExerciseTypeState;