import {Optional} from "sequelize";

import {
    Table,
    Column,
    AllowNull,
    Default,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    DataType,
    Model,
    AutoIncrement
} from "sequelize-typescript";


import User from "./user.model";
import Course from "./course.model";

import { TYPEROLE } from './../constants/role.constant';

interface IMember {
    id?: number;
    userId: number;
    courseId: number;
    role: string;
    isBlocked: Boolean;
}

interface MemberCreationAttributes extends Optional<IMember, "id"> {}

@Table({
    paranoid: true,
    timestamps: true,
})
class Member extends Model<IMember, MemberCreationAttributes> {

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
    @Default(false)
    @Column(DataType.BOOLEAN)
    isBlocked!: Boolean;
}


export default Member;