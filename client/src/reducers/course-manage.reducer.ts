import { ICourseModalAction, ICreateCourseModal } from "../interfaces";
import { CREATE_COURSE_MODAL } from "../constants";

const initState: ICreateCourseModal = {
    isOpenModal: false,
}

const courseManageReducer = (state = initState, action: ICourseModalAction) => {

    switch (action.type) {
        case CREATE_COURSE_MODAL: {
            return {
                isOpenModal: !state.isOpenModal,
            }
        }
        default:
            return {
                ...initState,
            }
    }
}

export default courseManageReducer;