import { ITokenResponse, IRefreshToken } from './token.interface';
export interface ISigninInput {
    email: string,
    password: string,
}

export interface IUserSummary {
    id: number,
    firstName: string,
    lastName: string,
    birthDay: Date,
    gender: string,
    email: string,
    avatarUrl?: string,
}

export interface IUserHeader {
    type: string,
    payload?: IUserSummary,
}

export interface ISigninRespone {
    user: IUserSummary,
    token: ITokenResponse,
}

export interface ISignInType {
    type: string,
    payload?: ISigninRespone
}

//---------------
export interface ISignUpInput {
    firstName: string, 
    lastName: string,
    birthDay: Date,
    gender: string,
    email: string,
    password: string,
}

export interface ISignUpType {
    type: string,
    payload?: null,
}


export interface ILogoutBody extends IRefreshToken {}

export interface ILogoutType {
    type: string,
    payload?: null,
}

export type IAuthenAction = ISignInType | IUserHeader | ISignUpType | ILogoutType;