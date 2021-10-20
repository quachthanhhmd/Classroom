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
    AutoIncrement,
    HasMany
} from "sequelize-typescript";

import { Member } from "./";

interface ICourse {
    id?: number,
    name: string,
    description?: string,
    code?: string,
    studentLimit: number,
    studentExist: number,
    avatar?: string,
}


interface CourseCreationAttributes extends Optional<ICourse, "id"> { }

@Table({
    paranoid: true,
    timestamps: true,
})
export class Course extends Model<ICourse, CourseCreationAttributes> {

    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    description?: string;

    @AllowNull
    @Column(DataType.STRING(8))
    code!: string

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    studentLimit!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    studentExist!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    avatar?: string;

    @HasMany(() => Member)
    memberList!: Member[];
}
