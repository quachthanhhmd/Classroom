import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CourseService, NotificationService, UserService } from "../services";
import { serializeUserDetail, IAuthorizeRequest, IPagingRequest, IRequest, IResponse } from "./../interfaces";
import { serializeCourseList } from "./../interfaces/course.interface";
import { serializeUserProfile } from "./../interfaces/user.interface";

@injectable()
export class UserController {

    constructor(
        @inject("UserService") private readonly _userService: UserService,
        @inject("NotificationService") private readonly _notificationService: NotificationService,
        @inject("CourseService") private readonly _courseService: CourseService) { }

    public getUser = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const id = +req.params.id;

            const user = await this._userService.getInforById(id);
            if (!user) return res.composer.notFound();
            // const notificationList = await this._notificationService.getAllNotificationUser(user.id);

            return res.composer.success(serializeUserDetail({user}));
        } catch (err) {
            console.error(err);
            res.composer.otherException(err);
        }
    }

    public getCoursePaging = async (
        req: IPagingRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const id = <number> req.currentUser?.id;

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
            const userId = <number> req.currentUser?.id;
            const body = req.body;

            if (typeof body.birthDay === "string") {
                const birthDay = body.birthDay;
                delete body.birthDay;
                body.birthDay = new Date(birthDay);
            }
            await this._userService.updateProfile(userId, body);
            const userAfterUpdate = await this._userService.findUserById(userId);

            return res.composer.success(serializeUserProfile(userAfterUpdate));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public updatePassword = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const { oldPassword, newPassword } = req.body;

            const user = await this._userService.findUserById(userId);

            if (!user) return res.composer.badRequest();

            const isMatchPassword = await this._userService.isPasswordMatch(user.password, oldPassword);

            if (!isMatchPassword) return res.composer.badRequest("Password not right");

            await this._userService.updatePassword(user.id, newPassword);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}
