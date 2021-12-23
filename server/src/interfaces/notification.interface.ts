export const serializeNotify = (model: any) => {

    return {
        id: model.id,
        content: model.content,
        isRead: model.isRead,
        uri: model.uri,
        createdAt: model.createdAt,
        info: {
            avatarUrl: model.info.avatarUrl,
            name: model.info.name,
        },
    }
}

export interface ICreateNotification {
    content: string,
    uri: string
    isRead?: boolean,
    userId?: number,
    refType: string,
    refId: number
}