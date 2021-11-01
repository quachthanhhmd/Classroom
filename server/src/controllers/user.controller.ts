import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CourseService, UserService } from "../services";
import { IAuthorizeRequest, IPagingRequest, IRequest, IResponse } from './../interfaces';
import { serializeCourseList } from './../interfaces/course.interface';
import { serializeUserProfile } from './../interfaces/user.interface';

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

            return res.composer.success(user);
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

    public updateProfile = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const userId = req.currentUser!.id;
            const body = req.body;

            await this._userService.updateProfile(userId, body);
            const userAfterUpdate = await this._userService.findUserById(userId);

            return res.composer.success(serializeUserProfile(userAfterUpdate));
        } catch(err) {
            return res.composer.otherException(err);
        }
    }
}


