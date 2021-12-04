import { serializeAttachment, serializeComment, serializeExerciseThumbnail } from "."
import { Exercise, Feed } from "../models";

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

export function isFeedDetail(object: any): object is Feed {
    return "content" in object;
}

export const serializeFeedDetailList = (modelList: (Feed | Exercise)[]) => {

    return modelList.map((model: Feed | Exercise) => {

        if (isFeedDetail(model)) return serializeFeedDetail(model);

        return serializeExerciseThumbnail(model);
    });
}