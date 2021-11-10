import { MEMBERSTATE } from './../constants/state.constant';
import { TYPEROLE } from './../constants/role.constant';
import "reflect-metadata";
import { IAuthorizeRequest, IResponse } from './../interfaces';

import { injectable, inject } from 'inversify';
import { MemberService } from "../services";
import { MEMBER_EXISTS } from "../constants";
import { IGetRoleUser, IUpsertStudentID, serializeGetRole } from '../interfaces/member.interface';

@injectable()
export class MemberController {
    constructor(
        @inject("MemberService") private readonly _memberService: MemberService,
    ) { }

    public addNewMember = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const memberId = req.body;

            const requestJoin = await this._memberService.upsetMember(memberId, courseId, MEMBERSTATE.ACCEPT);
            console.log(requestJoin);

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
            console.log(requestJoin);

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

            const isStudentRole = await this._memberService.isStudentRole(upsertBody.userId, upsertBody.courseId);
            if (!isStudentRole) {
                return res.composer.unauthorized();
            }

            await this._memberService.AddStudentId(upsertBody.userId, upsertBody.courseId, upsertBody.studentId);
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
            const courseId =  req.params.courseId;

            const result = await this._memberService.getRoleMember(userId!, +courseId);
            if (!result) return res.composer.notFound();

        return res.composer.success(serializeGetRole(result));
        } catch (err) {
            res.composer.otherException(err);
        }
    }
}