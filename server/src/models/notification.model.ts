import { Optional } from "sequelize";
import {
    AllowNull,
    AutoIncrement, BelongsTo, Column,
    DataType,
    Default, ForeignKey, Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { User } from ".";

interface INotification {
    id?: number,
    content: string,
    isRead?: boolean,
    uri: string,
    userId: number,
}

export enum NotificationType {
    USER = "user",
    COURSE = "course",
}

interface INotificationAttributes extends Optional<INotification, "id"> { }

@Table({
    paranoid: true,
    timestamps: true,
    tableName: "notification"
})
export class Notification extends Model<INotification, INotificationAttributes> {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content!: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isRead!: boolean;

    @AllowNull(false)
    @Column(DataType.STRING)
    uri!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    refType!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    refId!: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @BelongsTo(() => User)
    user?: User;
}
