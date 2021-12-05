import { ICommentResponse } from './comment.interface';
import { ICreateAttachment, IAttachmentResponse } from "./attachment.interface";

export interface ICreateSubmission {
    type: string
    attachmentList: ICreateAttachment[]
}

export interface ISubmissionResponse {
    id: number,
    type: string,
    score: number,
    userId: number,
    exerciseId: number,
    attachmentList: IAttachmentResponse[],
    commentList: ICommentResponse[],
}