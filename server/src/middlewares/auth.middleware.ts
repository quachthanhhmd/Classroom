import { UNAUTHENTICATED } from './../constants';
import "reflect-metadata";
import passport from "passport";

import { injectable } from 'inversify';

import { IResponse, IRequest, INextFunction } from './../interfaces';
import { User } from "../models";


@injectable()
export class Authenticate {

    private verifyCallback = (req: IRequest, res: IResponse, resolve: any, reject: any) => async (err: string, user: User, info: any) => {
        if (err || info || !user)
            return reject(res.composer.unauthorized(UNAUTHENTICATED));

        req.user = user;
        resolve();
    }

    /**
     * Function to autheticate role for user when try to connect any url which must use authetication.
     * Remenber that if you want to have more Role, you can add an array as a parameter in function below
     * And pass them in the head function. 
     */
    public authenticate = () => (req: IRequest, res: IResponse, next: INextFunction) => {
        return new Promise((resolve, reject) => {
            passport.authenticate('jwt', { session: false }, this.verifyCallback(req, res, resolve, reject))(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    };
}

