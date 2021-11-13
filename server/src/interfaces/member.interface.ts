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

export const serializeGetSummaryMember = (model: any) => {
    return model.map((member: any) => {
        return {
            memberId: member.id,
            type: member.type,
            role: member.role,
            studentId: member?.studentId,
            user: {
                firstName: member.user.firstName,
                lastName: member.user.lastName,
                userId: member.user.id,
                avatarUrl: member.user.avatarUrl,
                email: member.user.email
            }
        }
    })
}