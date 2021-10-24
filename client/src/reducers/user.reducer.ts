import {
    GET_ALL_USER_COURSE_SUCCESS,
    GET_ALL_USER_COURSE_FAIL,
    GET_ALL_USER_COURSE_REQUEST
} from "../constants";

// import { IUserAction } from "../interfaces";

// const initState = {
//     data: [],
//     pagination: {
//         total: 0,
//         size: 0,
//         totalPages: 0,
//         page: 0,
//     },
//     class: {},
//     isLoading: false,
// };

// const userReducer = (state = initState, action: IUserAction) => {

//     switch (action.type) {
//         case GET_ALL_USER_COURSE_REQUEST:
//             return {
//                 ...state,
//                 data: [],
//                 isLoading: true
//             }
//         case GET_ALL_USER_COURSE_SUCCESS:
//             return {
//                 ...state,
//                 data: action.payload?.courses,
//                 pagination: action.payload?.pagination,
//                 isLoading: false,
//             }
//         case GET_ALL_USER_COURSE_FAIL: {
//             return {
//                 ...state,
//                 data: [],
//                 isLoading: false,
//             }
//         }
//         default:
//             return {
//                 ...state,
//             };
//     }
// }

// export default userReducer;
