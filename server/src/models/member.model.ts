import { Optional } from "sequelize";
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { Course, User } from "./";
import { MEMBERSTATE, TYPEROLE } from "./../constants";
import { StudentType } from "./../constants/role.constant";

interface IMember {
    id?: number;
    userId: number;
    courseId: number;
    role?: string;
    studentId?: string;
    type?: string;
    authType?: string;
}

interface IMemberCreationAttributes extends Optional<IMember, "id"> { }

@Table({
    paranoid: true,
    timestamps: true,
    tableName: "member"
})
export class Member extends Model<IMember, IMemberCreationAttributes> {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @BelongsTo(() => User)
    user?: User;

    @AllowNull(false)
    @ForeignKey(() => Course)
    @Column(DataType.INTEGER.UNSIGNED)
    courseId!: number;

    @BelongsTo(() => Course)
    course?: Course;

    @AllowNull(false)
    @Column(DataType.ENUM(TYPEROLE.ASSISTANT, TYPEROLE.STUDENT, TYPEROLE.TEACHER))
    role!: string;

    @AllowNull(false)
    @Default(StudentType.NOT_AUTH)
    @Column(DataType.ENUM(StudentType.NOT_AUTH, StudentType.AUTH))
    authType!: string

    @AllowNull(true)
    @Column(DataType.STRING(10))
    studentId!: string;

    @AllowNull(false)
    @Default(MEMBERSTATE.SPENDING)
    @Column(DataType.ENUM(MEMBERSTATE.ACCEPT, MEMBERSTATE.BLOCKED, MEMBERSTATE.REJECT, MEMBERSTATE.SPENDING))
    type!: string;
}
