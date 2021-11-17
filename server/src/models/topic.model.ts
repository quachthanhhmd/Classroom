import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { Course } from ".";
import { Exercise } from "./exercise.model";

interface ITopic {
    id?: number,
    topic: string,
    courseId: number,
}

interface ITopicCreationAttributes extends Optional<ITopic, "id"> {}

@Table({
    timestamps: true,
    paranoid: true,
    tableName: "topic"
})
export class Topic extends Model<ITopic, ITopicCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    topic!: string;

    @AllowNull(false)
    @ForeignKey(() => Course)
    @Column(DataType.INTEGER.UNSIGNED)
    courseId!: number;

    @HasMany(() => Exercise)
    exerciseList!: Exercise[];
}