import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, Default, HasMany, Index, IsEmail, Model, PrimaryKey, Table, Unique
} from "sequelize-typescript";
import { initPasswordHash } from "../config/bcrypt";
import { Member, Token } from "./";
import { GENDER } from './../constants/gender.constant';
import { OAuth } from "./oAuth.model";

interface IUser {
    id?: number,
    email: string,
    password?: string,
    firstName: string,
    lastName: string,
    gender?: string,
    birthDay?: Date,
    avatarUrl?: string,
    isVerified?: Boolean,
    isBlocked?: Boolean,
    OAuthId?: string,
}

interface UserCreationAttibutes extends Optional<IUser, "id"> { }

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

    @AllowNull(true)
    @Column(DataType.STRING(50))
    lastName!: string;

    @AllowNull(true)
    @Column(DataType.DATEONLY)
    birthDay!: Date;

    @AllowNull(false)
    @Default(GENDER.MALE)
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

    @AllowNull(true)
    @Column(DataType.STRING)
    avatarUrl!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    set password(value: string | undefined) {
        console.log("3, ", value);
        if (typeof value === "undefined") {
            const passwordHash: string = initPasswordHash(generateRandomPassword());
            this.setDataValue("password", passwordHash);
            return
        }

        if (value.length < 8) {
            throw new Error('password must be at least 8 characters');
        }

        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('password must contain at least 1 letter and 1 number');
        }

        const passwordHash: string = initPasswordHash(value);
        this.setDataValue("password", passwordHash);
    }
    get password(): string {
        return this.getDataValue("password") as string;
    }

    @HasMany(() => Token)
    tokenList?: Token[];

    @HasMany(() => Member)
    memberList?: Member[];

    @HasMany(() => OAuth)
    oAuthList?: OAuth[];
};


const generateFromList = (strList: string, length: number): string => {
    let result: string = "";
    for (let i = 0; i < length; i++) {
        result += strList.charAt(Math.floor(Math.random() * strList.length));
    }
    return result;
}

export const generateRandomPassword = (length = 15): string => {

    const upperCaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseList = "abcdefghijklmnopqrstuvwxyz";
    const numberList = "0123456789";

    const upperCaseLength = Math.floor(Math.random() * (length - 3) + 1);
    const lowerCaseLength = Math.floor(Math.random() * (length - upperCaseLength - 1) + 1);
    const numberLength = Math.floor(Math.random() * (length - upperCaseLength - lowerCaseLength - 1) + 1);
    console.log(upperCaseLength, lowerCaseLength, numberLength);
    const result = generateFromList(upperCaseList, upperCaseLength) + generateFromList(lowerCaseList, lowerCaseLength) + generateFromList(numberList, numberLength);
    console.log(result);
    
    return result
        .split('')
        .sort((a, b) => 0.5 - Math.random())
        .join('');
}