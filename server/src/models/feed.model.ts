import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, PrimaryKey, Table,
} from "sequelize-typescript";
import { Course } from "./course.model";
import { User } from "./user.model";

interface IFeed {
    id?: number,
    content: string,
    userId: number,
    courseId: number,
}

interface IFeedCreation extends Optional<IFeed, "id"> { }

@Table({
    timestamps: true,
    paranoid: true,
    tableName: "feed"
})
export class Feed extends Model<IFeed, IFeedCreation> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @ForeignKey(() => Course)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    courseId!: number;

    @BelongsTo(() => User)
    user?: User;

    // @BelongsTo(() => Course)
    // course!: Course;
}