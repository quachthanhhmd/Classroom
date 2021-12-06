import { ICommentResponse, ITopicDetail } from ".";

export interface ICreateExercise {
    title: string,
    topic: {
        id: number,
        topic: string
    },
    deadline: string,
    typeId: number,
}

export interface IExerciseDetail {
    id: number,
    title: string,
    description: string,
    deadline: Date,
    courseId: number,
    topic: {
        topic: string,
        id: number,
    },
    user: {
        id: number,
        firstName: string,
        lastName: string,
        avatarUrl: string
    },
    type: {
        name: string,
        id: number
    },
    commentList: ICommentResponse[],
    attachmentList: any[],
    createdAt: Date,
    updateAt: Date,
}

export interface IDeadlineResponse {
    id: number,
    title: string,
    deadline: Date,
}


export interface IExerciseThumbnail {
    id: number,
    title: string,
    description?: string,
    deadline: Date,
    topicId: number,
    typeId: number,
    createdAt: Date,
    updateAt: Date,
}


export interface ICreateExerciseType {
    name: string,
    description?: string
    grade: number,
}

export interface IChangeOrder {
    id: number,
    orderIndex: number,
}

export interface IChangeOrderState {
    type: string,
    payload?: IExerciseTypeDetail[]
}

export interface IUpdateExerciseType {
    name?: string,
    description?: string
    grade?: number,
}

export interface IDeleteExerciseType {
    id: number,
}

export interface IDeleteExerciseTypeState {
    type: string,
    payload?: IDeleteExerciseType
}

export interface IExerciseTypeDetail {
    id: number,
    name: string,
    description?: string,
    grade: number,
    orderIndex: number
}

export interface ICreateExerciseTypeState {
    type: string,
    payload?: IExerciseTypeDetail
}

export interface IUpdateExerciseTypeState {
    type: string,
    payload?: IExerciseTypeDetail
}

export interface IGetAllExerciseResponse {
    topicList: ITopicDetail[];
    exerciseList: IExerciseThumbnail[];
}


export type IExerciseAction = ICreateExerciseTypeState | IUpdateExerciseTypeState | IChangeOrderState | IDeleteExerciseTypeState;