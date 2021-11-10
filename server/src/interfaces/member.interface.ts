export interface IUpsertStudentID {
    userId: number, 
    courseId: number, 
    studentId: string,
}

export interface IGetRoleUser {
    userId: number, 
    courseId: number, 
}

export const serializeGetRole = (model: any) => {
    return {
        type: model.type,
        role: model.role,
        studentId: model?.studentId,
    }
}