export interface ICreateExerciseType {
    name: string,
    description?: string
    grade: number,
}

export interface IUpdateExerciseType {
    name?: string,
    description?: string
    grade?: number,
}

export interface IExerciseTypeDetail {
    id: number, 
    name: string,
    description?: string,
    grade: number
}

export interface ICreateExerciseTypeState {
    type: string,
    payload?: IExerciseTypeDetail
}

export interface IUpdateExerciseType {
    type: string,
    payload?: IUpdateExerciseType
}

export type IExerciseAction = ICreateExerciseTypeState | IUpdateExerciseType;