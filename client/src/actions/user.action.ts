import { GET_ALL_USER_COURSE_SUCCESS, GET_ALL_USER_COURSE_FAIL } from "../constants";
import { IUserCourseState } from "../interfaces";

// import userApi from "../api/user.api";

// export const getUserCouseList = () =>
//     async (dispatch: (args: IUserCourseState) => IUserCourseState) => {
//         try {


//             let result = await userApi.getAllCourse();

//             if (result.status !== 200)
//                 throw new Error();

//             if (result) {
//                 dispatch({
//                     type: GET_ALL_USER_COURSE_SUCCESS,
//                     payload: result.data,
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             dispatch({
//                 type: GET_ALL_USER_COURSE_FAIL,
//             });
//         }
//     };

// // export const getClass = (id) => async (dispatch) => {
// //     try {
// //         let result = await classApi.getOne(id);

// //         if (result) {
// //             dispatch({
// //                 type: CLASS_CONSTANTS.CLASS_GET_ONE_SUCCESS,
// //                 payload: result,
// //             });
// //         }
// //     } catch (error) {
// //         console.log(error);
// //         dispatch({
// //             type: CLASS_CONSTANTS.CLASS_GET_ONE_FAIL,
// //         });
// //     }
// // };

