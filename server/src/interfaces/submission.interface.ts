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
        attachmentList: model.attachmentList ? model.attachmentList.map(serializeAttachment) : [],
        commentList: model.commentList ? model.commentList.map(serializeComment) : [],
        updatedAt: model.updatedAt,
    }
}

export const serializeSubmissionSummary = (model: any) => {
    return {
        id: model.id,
        type: model.type,
        user: {
            id: model.user.id,
            firstName: model.user.firstName,
            lastName: model.user.lastName,
            avatarUrl: model.user.avatarUrl,
            email: model.user.email,
        },
        updatedAt: model.updatedAt,
        score: model.score,
    }
}

export const serializeSubmissionList = (modelList: any) => {

    return modelList.map(serializeSubmissionSummary)
}