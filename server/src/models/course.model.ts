import {
    AllowNull,
    AutoIncrement, Column,
    DataType,
    Default, DefaultScope, HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { Member } from "./";
import { ExerciseType } from "./exercise-type.model";
import { Exercise } from "./exercise.model";
import { Feed } from "./feed.model";

// interface ICourse {
//     id?: number,
//     name: string,
//     description?: string,
//     topic?: string,
//     code?: string,
//     ownerId: number,
//     studentLimit: number,
//     studentExist?: number,
//     avatarUrl?: string,
//     backgroundUrl?: string,
// }

// interface CourseCreationAttributes extends Optional<ICourse, "id"> { }

@Table({
    paranoid: true,
    timestamps: true,
    tableName: "course"
})
@DefaultScope({
    include: [
        { model: () => ExerciseType, separate: true, order:[["orderIndex", "ASC"]] },
    ]
})
export class Course extends Model {

    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Default(generateClassCode(6))
    @Column(DataType.STRING(6))
    code!: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    description?: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    topic?: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    studentLimit!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    studentExist!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    ownerId!: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    avatarUrl?: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    backgroundUrl?: string;

    // Associate
    @HasMany(() => Member)
    memberList?: Member[];

    @HasMany(() => Feed)
    feedList?: Feed[];

    @HasMany(() => Exercise)
    exerciseList?: Exercise[];

    @HasMany(() => ExerciseType)
    exerciseTypeList?: ExerciseType[];
}

function generateClassCode(length: number) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
