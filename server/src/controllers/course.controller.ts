import { inject, injectable } from "inversify";
import "reflect-metadata";
import { MEMBERSTATE } from "../constants";
import { CourseService, MemberService, TokenService, UserService } from "../services";
import { serializeCourseDetail, serializeCourseSummary, IAuthorizeRequest, IResponse } from "./../interfaces";
import { ICreateCourse } from "./../interfaces/course.interface";

@injectable()
export class CourseController {

    constructor(
        @inject("CourseService") private readonly _courseService: CourseService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("UserService") private readonly _userService: UserService,
        @inject("TokenService") private readonly _tokenService: TokenService,
    ) { }

    public addCourse = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseBody: ICreateCourse = req.body;
            const userId = req.currentUser?.id;
            const newClass = await this._courseService.createCourse(userId as number, courseBody);

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

            const course = await this._courseService.getCourseDetail(courseId);
            if (!course) {
                return res.composer.notFound();
            }

            return res.composer.success(serializeCourseDetail(course));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public joinCourseByCode = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const code = req.params.code;
            const userId = req.currentUser?.id;

            const course = await this._courseService.getCourseByCode(code);
            if (!course)
                return res.composer.notFound();

            await this._memberService.upsetMember(userId as number, course.id, MEMBERSTATE.ACCEPT);

            return res.composer.success(serializeCourseDetail(course));
        } catch (err) {
            res.composer.otherException(err);
        }
    }

    public joinCourseByUrl = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const code = req.query.give;
            const courseId = req.params.courseId;
            const userId = req.currentUser?.id;

            const isMatchCodeAndId = this._courseService.isMatchCodeAndId(+courseId, String(code));
            if (!isMatchCodeAndId) {
                return res.composer.notFound();
            }

            await this._memberService.upsetMember(userId as number, +courseId, MEMBERSTATE.ACCEPT);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public checkJoinCourseToken = async (
        req: IAuthorizeRequest,
        res: IResponse
    ) => {
        try {
            const { token, role } = req.query;
            const courseId = +req.params.courseId;
            const userId = req.currentUser?.id;

            const isSpendingMember = await this._memberService.isSpendingInvite(userId as number, courseId);
            if (!isSpendingMember) {
                return res.composer.badRequest();
            }

            const isMatchToken = await this._tokenService.isMatchTokenIdInvite(<string>token, userId as number);
            if (!isMatchToken) {
                return res.composer.forbidden();
            }

            await this._memberService.updateMember(userId as number, +courseId, MEMBERSTATE.ACCEPT, String(role));

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}