import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { Member, Token } from "./";
import { OAuth } from "./oAuth.model";
interface IUser {
    id?: number;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    gender?: string;
    birthDay?: Date;
    avatarUrl?: string;
    isVerified?: Boolean;
    isBlocked?: Boolean;
    OAuthId?: string;
}
interface UserCreationAttibutes extends Optional<IUser, "id"> {
}
export declare class User extends Model<IUser, UserCreationAttibutes> {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    birthDay: Date;
    gender: string;
    isVerified: boolean;
    isBlocked: boolean;
    avatarUrl: string;
    set password(value: string | undefined);
    get password(): string;
    tokenList?: Token[];
    memberList?: Member[];
    oAuthList?: OAuth[];
}
export declare const generateRandomPassword: (length?: number) => string;
export {};
