
export interface IProfileBody {
    gender: string,
    password: string,
    birthDay: Date,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
}

export interface IProfileState {
    type: string,
    payload?: IProfileBody,
}

export type IUserAction = IProfileState;


