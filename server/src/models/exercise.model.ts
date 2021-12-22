import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { Course, ExerciseType, Submission, User } from ".";
import { Topic } from "./topic.model";

export enum ExerciseState {
    COMPLETED = "completed",
    SPENDING = "spending",
}

interface IExercise {
    id?: number,
    title: string,
    description?: string,
    deadline?: Date,
    topicId?: number,
    courseId: number,
    state?: string,
    typeId: number,
    ownerId: number,
}

interface IExerciseCreationAttributes extends Optional<IExercise, "id"> { }

@Table({
    paranoid: true,
    timestamps: true,
    tableName: "exercise"
})
export class Exercise extends Model<IExercise, IExerciseCreationAttributes> {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    title!: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    description!: string;

    @AllowNull(false)
    @Default(ExerciseState.SPENDING)
    @Column(DataType.TEXT)
    state!: string;

    @AllowNull(true)
    @Column(DataType.DATE)
    deadline!: Date;

    @ForeignKey(() => Topic)
    @AllowNull(true)
    @Column(DataType.INTEGER.UNSIGNED)
    topicId!: number;

    @ForeignKey(() => Course)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    courseId!: number;

    @ForeignKey(() => ExerciseType)
    @AllowNull(true)
    @Column(DataType.INTEGER.UNSIGNED)
    typeId!: number;

    @HasMany(() => Submission)
    submissionList?: Submission[];

    @BelongsTo(() => Topic)
    topic?: Topic;

    @BelongsTo(() => Course)
    course?: Course;

    @BelongsTo(() => ExerciseType)
    type?: ExerciseType;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    ownerId!: number;

    @BelongsTo(() => User)
    user?: User;
}