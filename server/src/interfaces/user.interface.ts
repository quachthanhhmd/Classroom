
export interface ICreateUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDay: Date;
}

export interface IInforUser {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    birthDay: Date,
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
        },
        token: model.token,
    }
}