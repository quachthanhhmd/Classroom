import { serializeAttachment, serializeComment } from "."

export interface IFeedCreate {
    content: string;
}

export const serializeFeedDetail = (model: any) => {
    return {
        id: model.id,
        user: {
            id: model.user.id,
            firstName: model.user.firstName,
            lastName: model.user.lastName,
            avatarUrl: model.user.avatarUrl,
        },
        content: model.content,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        commentList: model.commentList ? model.commentList.map((comment) => (serializeComment(comment))) : [],
        attachmentList:
            model.attachmentList ? model.attachmentList.map((attachment) => (serializeAttachment(attachment))) : [],
    }
}

export const serializeFeedDetailList = (modelList: any) => {

    return modelList.map(serializeFeedDetail);
}