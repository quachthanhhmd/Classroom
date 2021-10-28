import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { LOGINTYPE } from "../constants";
import { User } from "./";

interface IOAuth {
    id?: number,
    type: string,
    uid: string,
    userId: number,
}

interface IOAuthCreation extends Optional<IOAuth, "id"> { }

@Table({
    timestamps: true,
})
export class OAuth extends Model<IOAuth, IOAuthCreation> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.ENUM(LOGINTYPE.FACEBOOK, LOGINTYPE.GITHUB, LOGINTYPE.GOOGLE))
    type!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    uid!: string;

    @ForeignKey(() => User)
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;
}
