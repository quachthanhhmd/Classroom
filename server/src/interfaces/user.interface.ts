import { IOAuthRequest } from "./";

export interface ICreateUser {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    gender?: string;
    birthDay?: Date;
    avatarUrl?: string;
}

export interface IInforUser {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    birthDay: Date,
    avatarUrl?: string,
}

export interface IUpdateUser {
    firstName?: string,
    lastName?: string,
    gender?: string,
    birthDay?: Date,
    avatarUrl?: string,
}
export interface ILoginOAuth extends IOAuthRequest{
    firstName: string,
    lastName?: string,
    email: string,
    avatarUrl?: string,
}

export const serializeUserLogin = (model: any) => {

    return {
        user: {
            id: model.user.id,
            email: model.user.email,
            firstName: model.user.firstName,
            lastName: model.user.lastName,
            gender: model.user.gender,
            birthDay: model.user.birthDay,
            avatarUrl: model.user.avatarUrl,
        },
        token: model.token,
    }
}

export const serializeUserProfile = (model: any) => {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        birthDay: model.birthDay,
        gender: model.gender,
        avatrUrl: model.avatarUrl,
    }
}