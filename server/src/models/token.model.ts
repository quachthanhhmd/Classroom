import { Optional } from "sequelize";
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
    Is,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";


import { User } from "./";
import { TYPETOKEN } from "../constants";



interface IToken {
    id?: number,
    token: string,
    type: string,
    expire: Date,
    userId: number
}

interface TokenCreationAttribute extends Optional<IToken, "id"> { };


@Table({
    timestamps: true,
    paranoid: false,
})
export class Token extends Model<IToken, TokenCreationAttribute> {

    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Index("token-index")
    @Column(DataType.STRING)
    token!: string;

    @AllowNull(false)
    @Column(DataType.ENUM(TYPETOKEN.VERIFY_EMAIL, TYPETOKEN.REFRESH, TYPETOKEN.RESET_PASSWORD))
    type!: string

    @AllowNull(false)
    @Column(DataType.DATE)
    expire!: Date;

    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @BelongsTo(() => User)
    user!: User
}
