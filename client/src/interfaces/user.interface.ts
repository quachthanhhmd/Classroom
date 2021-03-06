
export interface IProfileBody {
    gender: string,
    password: string,
    birthDay: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    studentId?: string,
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


