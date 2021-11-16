import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { Exercise } from "./exercise.model";

interface ITopic {
    id?: number,
    topic: string,
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

    @HasMany(() => Exercise)
    exerciseList!: Exercise[];
}