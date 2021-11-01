import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { User } from "./";
interface IToken {
    id?: number;
    token: string;
    type: string;
    expire: Date;
    userId: number;
}
interface TokenCreationAttribute extends Optional<IToken, "id"> {
}
export declare class Token extends Model<IToken, TokenCreationAttribute> {
    id: number;
    token: string;
    type: string;
    expire: Date;
    userId: number;
    user: User;
}
export {};
