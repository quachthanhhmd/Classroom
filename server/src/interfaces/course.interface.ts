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
    studentLimit?: number,
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
    ownerId: number
}

export interface ICourseSummary {
    id: number,
    name: string,
    topic: string,
    avatarUrl: string,
    ownerId: number,
}

export const serializeCourseSummary = (model: any): ICourseSummary | null => {
    if (!model) return null;

    return {
        id: model.id,
        name: model.name,
        topic: model.topic,
        avatarUrl: model.avatarUrl,
        ownerId: model.ownerId
    }
}

export const serializeCourseInfor = (model: any): ICourseInfor | null => {
    if (!model) return null;

    return {
        id: model.id,
        name: model.name,
        description: model.description,
        topic: model.topic,
        avatarUrl: model.avatarUrl,
        backgroundUrl: model.backgroundUrl,
        ownerId: model.ownerId
    }
}

export const serializeCourseList = (model: any) => {
    return {
        courses: get(model, "data", []).map(serializeCourseInfor),
        pagination: model.pagination,
    }
}

export const serializeCourseDetail = (model: any) => {
    return {
        id: model.id,
        name: model.name,
        code: model.code,
        description: model.description,
        topic: model.topic,
        avatarUrl: model.avatarUrl,
        backgroundUrl: model.backgroundUrl,
        studentExist: model.studentExist,
        studentLimit: model.studentLimit,
        exerciseTypeList: model.exerciseTypeList,
        topicList: model.topicList,
    }
}