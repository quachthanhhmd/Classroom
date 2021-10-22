import { number } from "joi";
import { get } from "lodash";

export interface ICreateCourse {
    name: string,
    description?: string,
    topic?: string
    studentLimit: number,
}

export interface IUpdateCourse {
    name?: string,
    description?: string,
    topic?: string,
    studentLimit?: string,
    avatarUrl?: string,
    backgroundUrl?: string,
}

export interface ICourseInfor {
    id: number,
    name: string,
    description: string,
    topic: string,
    avatarUrl: string,
    backgroundUrl: string,
}

export const serializeCourseSummary = (model: any): ICourseInfor | null => {
    if (!model) return null;

    return {
        id: model.id,
        name: model.name,
        description: model.description,
        topic: model.topic,
        avatarUrl: model.avatarUrl,
        backgroundUrl: model.backgroundUrl,
    }
}

export const serializeCourseList = (model: any) => {
    return {
        courses: get(model, "data", []).map(serializeCourseSummary),
        ...model.pagination,
    }
}