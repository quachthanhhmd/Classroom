import { serializeNotify, IOAuthRequest } from "./";

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
    studentId?: string,
}

export interface IUpdateUser {
    firstName?: string,
    lastName?: string,
    gender?: string,
    birthDay?: Date,
    avatarUrl?: string,
    studentId?: string,
    isVerified?: boolean
}
export interface ILoginOAuth extends IOAuthRequest {
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
            birthDay: serializeBirthDay(model.user.birthDay),
            avatarUrl: model.user.avatarUrl,
            studentId: model.user.studentId,
        },
        // notifyList: model.notificationList ? model.notificationList.map(serializeNotify) : [],
        token: model.token,
    }
}

const serializeBirthDay = (date: any)  => {

    if (date !== null || date !== undefined || date !== "") {
        return date;
    }

    return "";
}

export const serializeUserDetail = (model: any) => {
    const body = {
        id: model.user.id,
        email: model.user.email,
        firstName: model.user.firstName,
        lastName: model.user.lastName,
        gender: model.user.gender,
        birthDay: serializeBirthDay(model.user.birthDay),
        avatarUrl: model.user.avatarUrl,
        studentId: model.user.studentId,
    }

    return body;
}
export const serializeUserProfile = (model: any) => {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        birthDay: serializeBirthDay(model.birthDay),
        gender: model.gender,
        avatarUrl: model.avatarUrl,
        studentId: model.studentId,
    }
}