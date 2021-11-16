import { Optional } from "sequelize";
import {
    AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table
} from "sequelize-typescript";
import { ReferenceType } from "./comment.model";

export enum FileType {
    PHOTO = "photo",
    VIDEO = "video",
    SOUND = "sound",
    OTHER = "other",
}

interface IAttachment {
    id?: number;
    name?: string;
    type: FileType;
    extension?: string;
    url: string;
    thumbnailUrl?: string;
    description?: string;
    size: number;

    refType: ReferenceType;
    refId: number;
}

interface IAttachmentCreationAttributes extends Optional<IAttachment, "id"> { }

@Table({
    timestamps: true,
    paranoid: true,
    tableName: "attachment"
})
export class Attachment extends Model<IAttachment, IAttachmentCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.ENUM(...Object.values(FileType)))
    type!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    url!: string;

    @Column(DataType.TEXT)
    extension!: string;

    @Column(DataType.TEXT)
    thumbnailUrl!: string;

    @Column(DataType.TEXT)
    description!: string;

    @Column(DataType.BIGINT)
    size!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    refType!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    refId!: number;

}