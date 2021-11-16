import { ReferenceType } from "../models";

export interface ICreateComment {
    content: string,
    refType: ReferenceType,
    refId: number,
}

export const serializeComment = (model: any) => {

    return {
        id: model.id,
        content: model.content,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        refType: model.refType,
        refId: model.refId,
        userId: model.userId
    }
}