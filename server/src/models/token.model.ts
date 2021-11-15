import { Optional } from "sequelize";
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType, ForeignKey,
    Index, Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { TYPETOKEN } from "../constants";
import { User } from "./";

interface IToken {
    id?: number,
    token: string,
    type: string,
    expire: Date,
    userId: number
}

interface ITokenCreationAttribute extends Optional<IToken, "id"> { }

@Table({
    timestamps: true,
    paranoid: false,
    tableName: "token",
})
export class Token extends Model<IToken, ITokenCreationAttribute> {

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
