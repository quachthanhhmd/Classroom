import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { User } from "./user.model";

interface IComment {
    id?: number,
    content: string,
    userId?: number,
    refType: ReferenceType,
    refId: number,
}

interface ICommentCreationAttributes extends Optional<IComment, "id"> { }

export enum ReferenceType {
    FEED = "feed",
    EXERCISE = "exercise",
    SUBMISSION = "submission",
}
@Table({
    timestamps: true,
    paranoid: true,
    tableName: "comment"
})
export class Comment extends Model<IComment, ICommentCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    refType!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    refId!: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;
}