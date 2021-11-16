export interface ICreateType {
    name: string;
    description?: string;
}

export const serializeExerciseTypeDetail = (model: any) => {
    return {
        id: model.id,
        name: model.name,
        description: model.description,
    }
}