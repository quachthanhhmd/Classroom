import { ICreateCourse } from './../interfaces/course.interface';
import "reflect-metadata";
import { injectable, inject } from "inversify";

import { INextFunction, IRequest, IResponse, IAuthorizeRequest, serializeCourseSummary, serializeCourseDetail } from './../interfaces';
import { CourseService, MemberService, UserService, TokenService } from "../services";
import { MEMBERSTATE } from '../constants';


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

            await this._memberService.upsetMember(userId!, course.id, MEMBERSTATE.ACCEPT);
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
            const userId = req.currentUser!.id;

            const isMatchCodeAndId = this._courseService.isMatchCodeAndId(+courseId, String(code));
            if (!isMatchCodeAndId) {
                return res.composer.notFound();
            }

            await this._memberService.upsetMember(userId, +courseId, MEMBERSTATE.ACCEPT);
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
            const userId = +req.currentUser!.id;

            const isSpendingMember = await this._memberService.isSpendingInvite(userId, courseId);
            if (!isSpendingMember) {
                return res.composer.badRequest();
            };

            const isMatchToken = await this._tokenService.isMatchTokenIdInvite(token as string, userId);
            if (!isMatchToken) {
                return res.composer.forbidden();
            }

            await this._memberService.upsetMember(userId, +courseId, MEMBERSTATE.ACCEPT, role as string);
            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}