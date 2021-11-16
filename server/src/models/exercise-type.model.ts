import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table
} from "sequelize-typescript";

interface IExerciseType {
    id?:number,
    name: string,
    description?: string,
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
}
