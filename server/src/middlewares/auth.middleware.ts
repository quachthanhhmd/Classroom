import { inject, injectable } from "inversify";
import passport from "passport";
import "reflect-metadata";
import { User } from "../models";
import { MemberService } from "../services";
import { UNAUTHENTICATED } from "./../constants";
import { IAuthorizeRequest, INextFunction, IResponse } from "./../interfaces";

@injectable()
export class Authenticate {
    constructor(
        @inject("MemberService") private _memberService: MemberService
    ) { }

    private verifyCallback = (
        req: IAuthorizeRequest, res: IResponse, resolve: any) => async (err: string, user: User, info: any) => {

            if (err || info || !user)
                return res.composer.unauthorized(UNAUTHENTICATED);

            req.currentUser = user;
            resolve();
        }

    /**
     * Function to autheticate role for user when try to connect any url which must use authetication.
     * Remenber that if you want to have more Role, you can add an array as a parameter in function below
     * And pass them in the head function. 
     */
    public authenticate = () => (req: IAuthorizeRequest, res: IResponse, next: INextFunction) => {
        return new Promise((resolve, _reject) => {
            passport.authenticate("jwt", { session: false }, this.verifyCallback(req, res, resolve))(req, res, next);
        })
            .then(next)
            .catch(next);
    };

    public courseAuthentication = (...requiredRights) =>
        async (req: IAuthorizeRequest, res: IResponse, next: INextFunction) => {

            const userId = <number> req.currentUser?.id;
            const courseId = +req.params.courseId;
            console.log(userId, courseId);
            const member = await this._memberService.getRole(userId, courseId);
            console.log(member);
            if (!member) return res.composer.forbidden();
            const isPermit = requiredRights.includes(member.role);
            if (!isPermit) {
                return res.composer.forbidden();
            }
            next();
        }
}
