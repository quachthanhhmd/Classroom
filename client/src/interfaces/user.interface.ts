
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

export interface IChangePassword {
    newPassword: string,
    oldPassword: string,
}

export interface IPasswordState {
    type: string,
    payload?: any
}

export type IUserAction = IProfileState | IPasswordState;


