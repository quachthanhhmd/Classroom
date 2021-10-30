import { ICreateCourse } from './../interfaces/course.interface';
import "reflect-metadata";
import { injectable, inject } from "inversify";

import { INextFunction, IRequest, IResponse, IAuthorizeRequest, serializeCourseSummary, serializeCourseDetail } from './../interfaces';
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
            return res.composer.success(serializeCourseSummary(newClass));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public getCourseDetail = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseId: number = +req.params.courseId;

            const course = await this._courseService.getCourseDetail(courseId!);
            if (!course) {{
                return res.composer.notFound();
            }}  
          
            return res.composer.success(serializeCourseDetail(course));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}