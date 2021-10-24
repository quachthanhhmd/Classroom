import {CREATE_COURSE_MODAL} from "../constants";

export const createCourseModal = (isOpenModal: boolean) => {
    return {
        type: CREATE_COURSE_MODAL,
        payload: {
            isOpenModal: isOpenModal
        }
    }
}