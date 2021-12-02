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

export type IExerciseAction = ICreateExerciseTypeState | IUpdateExerciseTypeState | IChangeOrderState | IDeleteExerciseTypeState;