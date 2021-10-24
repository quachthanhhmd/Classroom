import { ITokenResponse } from './token.interface';
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

export type IAuthenAction = ISignInType | IUserHeader;