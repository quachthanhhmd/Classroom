import { inject, injectable } from "inversify";
import "reflect-metadata";
import { sendInviteMember } from "../config/nodemailer";
import { MEMBER_EXISTS, StudentType, TYPEROLE } from "../constants";
import { serializeGetRole, serializeGetSummaryMember, IUpsertStudentID } from "../interfaces/member.interface";
import { CourseService, MemberService, TokenService, UserService } from "../services";
import { MEMBERSTATE } from "./../constants/state.constant";
import { IAuthorizeRequest, IResponse } from "./../interfaces";

@injectable()
export class MemberController {
    constructor(
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("CourseService") private readonly _courseService: CourseService,
        @inject("UserService") private readonly _userService: UserService,
        @inject("TokenService") private readonly _tokenService: TokenService
    ) { }

    public addNewMember = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const memberId = req.body;

            await this._memberService.upsetMember(memberId, courseId, MEMBERSTATE.ACCEPT, TYPEROLE.STUDENT);

            return res.composer.success("Request completed!");
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public requestJoinCourse = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;

            const getUserType: string | null =
                await this._memberService.findMemberState(<number> req.currentUser?.id, courseId);
            if (typeof getUserType !== "string") {
                return res.composer.badRequest(MEMBER_EXISTS);
            }
            await this._memberService.upsetMember(
                <number> req.currentUser?.id, courseId, MEMBERSTATE.ACCEPT, TYPEROLE.STUDENT);

            return res.composer.success("Request completed!");
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public upsertStudentId = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const upsertBody: IUpsertStudentID = req.body;
            const userId = req.currentUser?.id;

            const isExistStudentId =
                await this._memberService.isExistStudentId(upsertBody.courseId, upsertBody.studentId);
            if (isExistStudentId) return res.composer.badRequest();

            const member =
                await this._memberService.findMemberByUserAndCourseId(<number> userId, upsertBody.courseId);
            if (!member) {
                return res.composer.unauthorized();
            }

            await this._memberService.upsertStudentId(
                member.id, <number> userId, upsertBody.courseId, upsertBody.studentId);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public getRoleMember = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const userId = req.currentUser?.id;
            const courseId = req.params.courseId;

            const result = await this._memberService.getRoleMember(<number> userId, +courseId);

            if (!result) return res.composer.notFound();

            return res.composer.success(serializeGetRole(result));
        } catch (err) {
            res.composer.otherException(err);
        }
    }

    public getAllSummaryMember = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseId = req.params.courseId;
            const result = await this._memberService.getAllSummaryMember(+courseId);

            return res.composer.success(serializeGetSummaryMember(result));
        } catch (err) {
            res.composer.otherException(err);
        }
    }
    public inviteMemberByEmail = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = req.params.courseId;
            const { email, role } = req.body;

            // Check user exist
            let user = await this._userService.findUserbyEmail(email);
            if (!user) {
                user = await this._userService.createNoneUser(email);
            }

            // Check member exist
            const member = await this._memberService.findMemberByUserAndCourseId(user.id, +courseId);

            if (member) {
                if (member.type === MEMBERSTATE.ACCEPT) return res.composer.badRequest("Member is exist");

                // block or reject
                if (member.type === MEMBERSTATE.BLOCKED || member.type === MEMBERSTATE.REJECT) {
                    await this._memberService.updateMember(user.id, +courseId, MEMBERSTATE.SPENDING, role);
                }
            }

            if (!member) {
                const spendingMember =
                    await this._memberService.addMember(user.id, +courseId, role, MEMBERSTATE.SPENDING);

                if (!spendingMember) return res.composer.internalServerError();
            }
            const courseToken = await this._tokenService.generateTokenInvite(+user.id);
            await sendInviteMember(req, email, courseToken, role, +courseId);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public updateStateMember = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseId = req.params.courseId;
            const userId = req.params.userId;
            const state = req.body.state;

            const isUserExist = await this._userService.isUserExist(+userId);
            if (!isUserExist) return res.composer.badRequest();

            await this._memberService.updateMember(+userId, +courseId, state);

            return res.composer.success({ userId });
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public importAuthMember = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const { url } = req.body;

            const isSuccessImport = await this._memberService.importAuthMember(url, courseId);

            if (!isSuccessImport) {
                return res.composer.badRequest();
            }
            const memberAuthList = await this._memberService.getAllSummaryMember(courseId, StudentType.AUTH);

            return res.composer.success(serializeGetSummaryMember(memberAuthList));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}