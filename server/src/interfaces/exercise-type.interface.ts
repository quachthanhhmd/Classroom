export interface ICreateType {
    name: string;
    description?: string;
    grade: number;
    orderIndex: number;
}

export interface IUpdateOrder {
    id: number;
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

export const serializeExerciseTypeDetailList = (model: any[]) => {

    return model.map((item) => {
        return serializeExerciseTypeDetail(item);
    })
}