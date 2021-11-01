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
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDay: Date;
    avatarUrl?: string;
}
export interface IUpdateUser {
    firstName?: string;
    lastName?: string;
    gender?: string;
    birthDay?: Date;
    avatarUrl?: string;
}
export interface ILoginOAuth extends IOAuthRequest {
    firstName: string;
    lastName?: string;
    email: string;
    avatarUrl?: string;
}
export declare const serializeUserLogin: (model: any) => {
    user: {
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        gender: any;
        birthDay: any;
        avatarUrl: any;
    };
    token: any;
};
export declare const serializeUserProfile: (model: any) => {
    firstName: any;
    lastName: any;
    birthDay: any;
    gender: any;
    avatrUrl: any;
};
