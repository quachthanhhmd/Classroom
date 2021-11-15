import {Optional} from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { Course } from ".";
import { Topic } from "./topic.model";

interface IExercise {
    id?: number,
    title: string,
    description?: string,
    deadline?: Date,
    topicId?: number,
    courseId: number,
}

interface IExerciseCreationAttributes extends Optional<IExercise, "id"> {}

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

    @AllowNull(false)
    @Column(DataType.TEXT)
    description!: string;

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
}