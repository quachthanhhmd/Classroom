export interface ICreateType {
    name: string;
    description?: string;
    grade: number;
    orderIndex: number;
}

export const serializeExerciseTypeDetail = (model: any) => {
    return {
        id: model.id,
        name: model.name,
        description: model.description,
        grade: model.grade,
        orderIndex: model.orderIndex,
    }
}