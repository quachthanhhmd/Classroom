import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { Exercise, User } from ".";

interface ISubmission {
    id?:number,
    exerciseId: number,
    userId: number,
    score?: number,
    type: string,
}

export enum SubmissionType {
    SUBMITTED = "submitted",
    SCORED = "scored",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
}


interface ISubmissionCreationAttributes extends Optional<ISubmission, "id">{}

@Table({
    paranoid: true,
    // timestamps: true,
    tableName: "submission",
})
export class Submission extends Model<ISubmission, ISubmissionCreationAttributes> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @ForeignKey(() => Exercise)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    exerciseId!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @AllowNull(true)
    @Column(DataType.INTEGER.UNSIGNED)
    score!: number;

    @AllowNull(true)
    @Default(SubmissionType.SUBMITTED)
    @Column(DataType.TEXT)
    type!: string;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Exercise)
    exercise!: Exercise;
}