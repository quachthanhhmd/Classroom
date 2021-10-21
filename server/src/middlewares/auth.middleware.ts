import { Request } from "express";
import { UNAUTHENTICATED } from './../constants';
import "reflect-metadata";
import passport from "passport";

import { injectable } from 'inversify';

import { IResponse, INextFunction, IAuthorizeRequest } from './../interfaces';
import { User } from "../models";


@injectable()
export class Authenticate {

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
}

