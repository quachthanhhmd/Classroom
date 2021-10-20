import { GENDER } from './../constants/gender.constant';
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
    firstName: string,
    lastName: string,
    gender: string,
    birthDay: Date,
    isVerified?: Boolean,
    isBlocked?: Boolean,
}

interface UserCreationAttibutes extends Optional<IUser, "id"> {}

@Table({
    timestamps: true,
    paranoid: true,
})
export class User extends Model<IUser, UserCreationAttibutes> {

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
    @Column(DataType.STRING(50))
    firstName!: string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    lastName!: string;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    birthDay!: Date;

    @AllowNull(false)
    @Column(DataType.ENUM(GENDER.FEMALE, GENDER.MALE, GENDER.OTHER))
    gender!: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isVerified!: boolean;
    
    @AllowNull(false)
    @Default(false) 
    @Column(DataType.BOOLEAN)
    isBlocked!: boolean;



    @AllowNull(false)
    @Column(DataType.STRING)
    set password(value: string){

        if (!regexPassword.test(value)) {
            throw new Error(`Password must have Uppercase, lowercase, number, special characters, and more than 8 characters.`)
          }

        const passwordHash : string = initPasswordHash(value);
        this.setDataValue("password", passwordHash);
    }
    get password(): string {
        return this.getDataValue("password");
    }

    @HasMany(() => Token)
    tokenList?: Token[];

    @HasMany(() => Member)
    memberList?: Member[];
};  
