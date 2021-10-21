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
    name: string,
    description: string,
    topic: string,
    avatarUrl: string,
}

export const serializeCourseSummary = (model: any): ICourseInfor | null => {
    if (!model) return null;

    return {
        ...model,
    }
}

export const serializeCourseList = (model: any) => {
    return {
        courses: get(model, "data", []).map(serializeCourseSummary),
        ...model.pagination,
    }
}