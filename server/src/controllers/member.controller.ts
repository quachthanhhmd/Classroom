import { MEMBERSTATE } from './../constants/state.constant';
import { TYPEROLE } from './../constants/role.constant';
import "reflect-metadata";
import { IAuthorizeRequest, IResponse } from './../interfaces';

import { injectable, inject } from 'inversify';
import { CourseService, MemberService, UserService, TokenService } from "../services";
import { MEMBER_EXISTS } from "../constants";
import { IGetRoleUser, IUpsertStudentID, serializeGetRole, serializeGetSummaryMember } from '../interfaces/member.interface';
import { sendInviteMember } from '../config/nodemailer';

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

            const requestJoin = await this._memberService.upsetMember(memberId, courseId, MEMBERSTATE.ACCEPT);

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

            const getUserType: string | null = await this._memberService.findMemberState(req.currentUser!.id, courseId);
            if (typeof getUserType !== "string") {
                return res.composer.badRequest(MEMBER_EXISTS);
            }
            const requestJoin = await this._memberService.upsetMember(req.currentUser!.id, courseId);

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
            const userId = req.currentUser!.id;

            const member = await this._memberService.findMemberByUserAndCourseId(userId, upsertBody.courseId);
            if (!member || member.studentId) {
                return res.composer.unauthorized();
            }

            await this._memberService.AddStudentId(userId, upsertBody.courseId, upsertBody.studentId);
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

            const result = await this._memberService.getRoleMember(userId!, +courseId);

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

            //Check user exist
            const user = await this._userService.findUserbyEmail(email);
            if (!user) return  res.composer.notFound();
            
            //Check member exist
            const isExistMember = await this._memberService.isExistMember(user.id, +courseId);
            if (isExistMember) return res.composer.badRequest("Member is exist");

            //get code code
            const spendingMember = await this._memberService.addMember(user.id, +courseId, role, MEMBERSTATE.SPENDING);
            if (!spendingMember) return  res.composer.internalServerError();

            const courseToken = await this._tokenService.generateTokenInvite(+courseId);
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

   }
}