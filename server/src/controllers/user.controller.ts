import { serializeCourseList } from './../interfaces/course.interface';
import "reflect-metadata"

import { inject, injectable } from "inversify";

import { ICreateUser } from './../interfaces/user.interface';
import { IRequest, IResponse, IAuthorizeRequest, IPagingRequest } from './../interfaces';
import { CourseService, UserService } from "../services";



@injectable()
export class UserController {

    constructor(
        @inject("UserService") private readonly _userService: UserService,
        @inject("CourseService") private readonly _courseService: CourseService) { }

    public getUser = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const id = +req.params.id;

            const user = await this._userService.getInforById(id);

            return res.composer.success({ user });
        } catch (err) {
            res.composer.otherException(err);
        }
    }

    public getCoursePaging = async (
        req: IPagingRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const id = req.currentUser!.id;

            const courseList = await this._userService.getListCourseUser(id, req.query);
          
            return res.composer.success(serializeCourseList(courseList));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}


