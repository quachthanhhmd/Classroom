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

export const serializeAttachment = (model: any) => {
    return {
        id: model.id,
        name: model.name,
        type: model.type,
        extension: model.extension,
        url: model.url,
        thumbnailUrl: model.thumbnailUrl,
        description: model.description,
        size: model.size,
        createdAt: model.createdAt,
    }
}