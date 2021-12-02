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