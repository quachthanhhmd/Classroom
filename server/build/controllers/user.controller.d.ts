import "reflect-metadata";
import { CourseService, UserService } from "../services";
import { IAuthorizeRequest, IPagingRequest, IRequest, IResponse } from './../interfaces';
export declare class UserController {
    private readonly _userService;
    private readonly _courseService;
    constructor(_userService: UserService, _courseService: CourseService);
    getUser: (req: IRequest, res: IResponse) => Promise<void>;
    getCoursePaging: (req: IPagingRequest, res: IResponse) => Promise<void>;
    updateProfile: (req: IAuthorizeRequest, res: IResponse) => Promise<void>;
}
