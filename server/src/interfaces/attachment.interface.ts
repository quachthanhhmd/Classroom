import { FileType } from "../models";

export interface ICreateAttachment {
    name?: string;
    type: FileType;
    extension?: string;
    url: string;
    thumbnailUrl?: string;
    description?: string;
    size: number;
}