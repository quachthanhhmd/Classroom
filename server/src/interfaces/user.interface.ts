
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