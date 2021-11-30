export interface IComment {
    refType: string;
    refId: number;
    content: string;
}

export interface ICommentResponse {
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    refType: string,
    refId: number
    user: {
        id: number,
        firstName: string,
        lastName: string,
        avatarUrl:string,
    }
}