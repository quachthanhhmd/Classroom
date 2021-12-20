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
    public id!: number;

    @Column(DataType.TEXT)
    public name!: string;

    @Column(DataType.ENUM(...Object.values(FileType)))
    public type!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    public url!: string;

    @Column(DataType.TEXT)
    public extension!: string;

    @Column(DataType.TEXT)
    public thumbnailUrl!: string;

    @Column(DataType.TEXT)
    public description!: string;

    @Column(DataType.BIGINT)
    public size!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    public refType!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public refId!: number;

}
