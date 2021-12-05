export interface ICreateAttachment {
    name: string,
    type: string,
    extension?: string,
    url: string,
    thumbnailUrl?: string,
    description?: string,
    size: number,
}

export interface IAttachmentResponse {
    id: number,
    name: string,
    type: string,
    extension?: string,
    url: string,
    thumbnailUrl?: string,
    description?: string,
    size: number,
}