import { ICreateCourse } from './../interfaces/course.interface';
import "reflect-metadata";
import { injectable, inject } from "inversify";

import { INextFunction, IRequest, IResponse, IAuthorizeRequest, serializeCourseSummary } from './../interfaces';
import { CourseService, UserService } from "../services";


@injectable()
export class CourseController {

    constructor(
        @inject("CourseService") private readonly _courseService: CourseService,
        @inject("UserService") private readonly _userService: UserService,
    ) { }

    public addCourse = async (
        req: IAuthorizeRequest,
        res: IResponse,
        next: INextFunction,
    ): Promise<void> => {
        try {
            const courseBody: ICreateCourse = req.body;

            const newClass = await this._courseService.createCourse(req.currentUser!.id, courseBody);
            return  res.composer.success(serializeCourseSummary(newClass));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}