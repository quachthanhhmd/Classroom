import {Optional } from "sequelize";
import {
    Table, 
    Column, 
    Model, 
    DataType,
    AutoIncrement,
    PrimaryKey,
    IsEmail,
    Default,
    Index,
    Unique,
    AllowNull,
    HasMany,
    Is
} from "sequelize-typescript";

import {initPasswordHash} from "../config/bcrypt";

import Token from "./token.model";
import Member from "./member.model";

const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

interface IUser {
    id?: number,
    email: string,
    password: string,
    isVerified: Boolean,
    isBlocked: Boolean,
}

interface UserCreationAttibutes extends Optional<IUser, "id"> {}

@Table({
    timestamps: true,
    paranoid: true,
})
class User extends Model<IUser, UserCreationAttibutes> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @IsEmail
    @Index("email-index")
    @Unique(true)
    @Column(DataType.STRING(30))
    email!: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isVerified!: boolean;
    
    @AllowNull(false)
    @Default(false) 
    @Column(DataType.BOOLEAN)
    isBlocked!: boolean;

    @Is(function passwordValidate(value: string): void {
        if (!regexPassword.test(value)) {
          throw new Error(`Password must have Uppercase, lowercase, number, special characters, and more than 8 characters.`)
        }
      })
    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;
    set setPassword(value: string){

        const passwordHash : string = initPasswordHash(value);
        this.setDataValue("password", passwordHash);
    }

    @HasMany(() => Token)
    tokenList?: Token[];

    @HasMany(() => Member)
    memberList?: Member[];
};  

export default User;