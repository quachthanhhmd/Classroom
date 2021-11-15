export interface IFeedCreate {
    content: string;
}

export const serializeFeedDetail = (model: any) => {
    return {
        id: model.id,
        content: model.content,
        createdAt: model.createdAt,
        updateAt: model.updateAt,
    }
}