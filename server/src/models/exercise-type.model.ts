import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { Course, Exercise } from ".";

interface IExerciseType {
    id?:number,
    name: string,
    grade: number,
    description?: string,
    courseId?: number,
}

interface IExerciseCreationAttributes extends Optional<IExerciseType, "id"> { }

@Table({
    paranoid: true,
    timestamps: true,
    tableName: "exercise-type"
})
export class ExerciseType extends Model<IExerciseType, IExerciseCreationAttributes>{
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name!: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    description!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    grade!: number;

    @HasMany(() => Exercise)
    exerciseList?: Exercise[];

    @ForeignKey(() => Course)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    courseId!: string;
}
