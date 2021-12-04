import { serializeAttachment, serializeComment, serializeTopicDetail } from "."

export interface ICreateExercise {
    title: string,
    description?: string,
    deadline?: Date,
    topicId: number,
    typeId: number
}

export const serializeExerciseThumbnail = (model: any) => {
    return {
        id: model.id,
        title: model.title,
        description: model.description,
        deadline: model.deadline,
        topicId: model.topicId,
        typeId: model.typeId,
        createdAt: model.createdAt,
        updateAt: model.updateAt,
    }
}

export const serializeExerciseDetail = (model: any) => {
    return {
        id: model.id,
        title: model.title,
        description: model.description,
        deadline: model.deadline,
        courseId: model.courseId,
        topic: {
            topic: model.topic.topic,
            id: model.topic.id,
        },
        type: {
            name: model.type.name,
            id: model.type.id
        },
        user: {
            id: model.user.id,
            firstName: model.user.firstName,
            avatarUrl: model.user.avatarUrl,
            lastName: model.user.lastName,
        },
        commentList: model.commentList ? model.commentList.map((comment) => (serializeComment(comment))) : [],
        attachmentList:
            model.attachmentList ? model.attachmentList.map((attachment) => (serializeAttachment(attachment))) : [],
        createdAt: model.createdAt,
        updateAt: model.updateAt,
    }
}

export const serializeAllExercise = (model: any) => {
    return {
        exerciseList: model.exerciseList.map(serializeExerciseThumbnail),
        topicList: model.topicList.map(serializeTopicDetail)
    }
}

export const serializeExerciseList = (model: any) => {
    return model.map(serializeExerciseThumbnail);
}