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
        ownerId: model.ownerId,
        topicList: model.topicList,
    }
}

export const serializeStudentList = (model: any[], gradeList: any[]) => {
    return model.map((item) => serializeStudentAuth(item, gradeList));
}

const serializeStudentAuth = (model: any, gradeList: any[]) => {
    const totalScore = gradeList.filter((student) => student.id === model.id);

    return {
        id: model.id,
        role: model.role,
        authType: model.authType,
        studentId: model.studentId,
        totalScore: !totalScore || totalScore.length === 0 ? 0 : totalScore[0].totalScore,
        user: {
            userId: model.user.id,
            firstName: model.user.firstName,
            lastName: model.user.lastName,
            avatarUrl: model.user.avatarUrl,
            email: model.user.email
        },
        exerciseList: model.course.exerciseList ? model.course.exerciseList.map((exercise) => {
            return {
                exerciseId: exercise.id,
                state: exercise.state,
                title: exercise.title,
                typeId: exercise.typeId,
                submissionList: exercise.submissionList.filter((submission) => {
                    if (submission.userId === model.user.id) return true;

                    return false;
                })
            }
        }) : [],
    }
}