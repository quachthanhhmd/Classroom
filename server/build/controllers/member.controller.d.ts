import "reflect-metadata";
import { IAuthorizeRequest, IResponse } from './../interfaces';
import { MemberService } from "../services";
export declare class MemberController {
    private readonly _memberService;
    constructor(_memberService: MemberService);
    addNewMember: (req: IAuthorizeRequest, res: IResponse) => Promise<void>;
    requestJoinCourse: (req: IAuthorizeRequest, res: IResponse) => Promise<void>;
}
