import "reflect-metadata";
import { INextFunction, IResponse, IAuthorizeRequest } from './../interfaces';
import { CourseService, UserService } from "../services";
export declare class CourseController {
    private readonly _courseService;
    private readonly _userService;
    constructor(_courseService: CourseService, _userService: UserService);
    addCourse: (req: IAuthorizeRequest, res: IResponse, next: INextFunction) => Promise<void>;
    getCourseDetail: (req: IAuthorizeRequest, res: IResponse) => Promise<void>;
}
