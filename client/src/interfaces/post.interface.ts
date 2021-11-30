export interface IPostDetail {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    commentList: any[];
    attachmentList: any[];
    user: {
        id: number;
        firstName: string;
        lastName: string;
        avatarUrl: string
    }
}