export interface ICreateTopic {
    topic: string,
}

export const serializeTopicDetail = (model: any) => {
    return {
        id: model.id,
        topic: model.topic,
        courseId: model.courseId
    }
}