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
    orderIndex?: number,
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
    public id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    public name!: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    public description!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public orderIndex!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public grade!: number;

    @HasMany(() => Exercise)
    public exerciseList?: Exercise[];

    @ForeignKey(() => Course)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public courseId!: string;
}
