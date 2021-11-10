import { Optional } from "sequelize";

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


import { User, Course } from "./";
import { TYPEROLE, MEMBERSTATE } from './../constants';

interface IMember {
    id?: number;
    userId: number;
    courseId: number;
    role?: string;
    studentId?: string;
    type?: string;
}

interface MemberCreationAttributes extends Optional<IMember, "id"> { }

@Table({
    paranoid: true,
    timestamps: true,
})
export class Member extends Model<IMember, MemberCreationAttributes> {
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

    @AllowNull(true)
    @Column(DataType.STRING(10))
    studentId!: string;

    @AllowNull(false)
    @Default(MEMBERSTATE.SPENDING)
    @Column(DataType.ENUM(MEMBERSTATE.ACCEPT, MEMBERSTATE.BLOCKED, MEMBERSTATE.REJECT, MEMBERSTATE.SPENDING))
    type!: string;
}
