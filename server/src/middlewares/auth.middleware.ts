import { Request } from "express";
import { UNAUTHENTICATED } from './../constants';
import "reflect-metadata";
import passport from "passport";

import { inject, injectable } from 'inversify';

import { IResponse, INextFunction, IAuthorizeRequest } from './../interfaces';
import { User } from "../models";
import { MemberService } from "../services";
import { roleRights } from "../config/role";

@injectable()
export class Authenticate {
    constructor(
        @inject("MemberService") private _memberService: MemberService
    ) { }

    private verifyCallback = (req: IAuthorizeRequest, res: IResponse, resolve: any) => async (err: string, user: User, info: any) => {

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
        return new Promise((resolve, reject) => {
            passport.authenticate('jwt', { session: false }, this.verifyCallback(req, res, resolve))(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    };

    public courseAuthentication = (...requiredRights) => async (req: IAuthorizeRequest, res: IResponse, next: INextFunction) => {
        const userId = req.currentUser!.id;
        const courseId = +req.params.courseId;
        const role = await this._memberService.getRoleMember(userId, courseId);


        const userRights = roleRights.get(role);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights) {
           return res.composer.forbidden();
        }

    }
}

