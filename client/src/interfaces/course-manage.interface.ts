export interface ICreateCourseModal {
    isOpenModal: boolean,
}

export interface ICourseModal {
    type: string,
    payload: ICreateCourseModal
}

export type ICourseModalAction = ICourseModal;