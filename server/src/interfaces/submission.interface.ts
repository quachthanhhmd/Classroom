import { serializeAttachment, serializeComment, ICreateAttachment } from ".";

export interface ICreateSubmission {
    type?: string,
    attachmentList?: ICreateAttachment[],
}

export interface IUpdateSubmission {
    type?: string,
    exerciseId?: number,
    score?: number,
}

export const serializeSubmissionDetail = (model: any) => {
    return {
        id: model.id,
        type: model.type,
        score: model.score,
        userId: model.userId,
        exerciseId: model.exerciseId,
        attachmentList: model.attachmentList.map(serializeAttachment),
        commentList: model.commentList.map(serializeComment),
    }
}