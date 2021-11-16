import { serializeAttachment, serializeComment } from "."

export interface IFeedCreate {
    content: string;
}

export const serializeFeedDetail = (model: any) => {
    return {
        id: model.id,
        content: model.content,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        commentList: model.commentList.map((comment) => (serializeComment(comment))),
        attachmentList: model.attachmentList.map((attachment) => (serializeAttachment(attachment))),
    }
}
