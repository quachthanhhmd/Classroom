export interface INotification {
    id: number,
    content: string,
    uri: string,
    isRead: boolean,
    info: {
        name: string,
        avatarUrl: string
    },
    createdAt: Date,
}

export interface INotificationState {
    type: string,
    payload?: number,
}

export interface ICreateNotification {
    content: string,
    uri: string
    isRead?: boolean,
    userId?: number,
    refType: string,
    refId: number
}