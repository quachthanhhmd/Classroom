import { ICommentResponse } from './comment.interface';
import { ICreateAttachment, IAttachmentResponse } from "./attachment.interface";

export interface ICreateSubmission {
    type: string
    attachmentList: ICreateAttachment[]
}

export interface IReviewGrade {
    grade: number,
    note: string,
}

export interface ISubmissionResponse {
    id: number,
    type: string,
    score?: number,
    userId: number,
    exerciseId: number,
    attachmentList: IAttachmentResponse[],
    commentList: ICommentResponse[],
    updatedAt: Date;
}

export interface ISubmissionSummary {
    id: number,
    type: string,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        avatarUrl?: string,
        email: string,
    },
    updatedAt: Date,
    score?: number,
}