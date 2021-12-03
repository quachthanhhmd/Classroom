import { serializeTopicDetail } from "."

export interface ICreateExercise {
    title: string,
    description?: string,
    deadline?: Date,
    topicId: number,
    typeId: number
}

export const serializeExerciseDetail = (model: any) => {
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

export const serializeAllExercise = (model: any) => {
    return {
        exerciseList: model.exerciseList.map(serializeExerciseDetail),
        topicList: model.topicList.map(serializeTopicDetail)
    }
}

export const serializeExerciseList = (model: any) => {
    return model.map(serializeExerciseDetail);
}