import { UNAUTHENTICATED } from './../constants/message/auth.message';
import "reflect-metadata"

import { inject, injectable } from "inversify";

import { UserService, AuthService, TokenService } from "../services";
import { IRequest, IResponse, INextFunction } from './../interfaces';
import { INCORRECT_LOGIN, TYPETOKEN, USER_EXIST } from "../constants";
import { ICreateUser, serializeUserLogin } from './../interfaces';


@injectable()
export class AuthController {

    constructor(
        @inject("UserService") private readonly _userService: UserService,
        @inject("AuthService") private readonly _authService: AuthService,
        @inject("TokenService") private readonly _tokenService: TokenService,
    ) { }

    public signUp = async (
        req: IRequest,
        res: IResponse,
        next: INextFunction
    ): Promise<void> => {
        try {

            const userBody: ICreateUser = req.body;

            const existUser = await this._userService.findUserbyEmail(userBody.email);
            if (existUser) {
                return res.composer.badRequest(USER_EXIST);
            }

            const newUser = await this._userService.createUser(userBody);
            if (!newUser) {
                return res.composer.internalServerError();
            }

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    };

    public signIn = async (
        req: IRequest,
        res: IResponse,
        next: INextFunction
    ): Promise<void> => {
        try {
            const { email, password } = req.body;
    
            const user = await this._authService.loginWithEmailAndPassword(email, password);

            if (!user) {
                return res.composer.badRequest(INCORRECT_LOGIN);
            }

            const tokenCreate = await this._tokenService.generateTokenAuth(user!.id);

            return res.composer.success(
                serializeUserLogin({
                    user: user,
                    token: tokenCreate,
                })
            );
        } catch (err) {
            return res.composer.otherException(err);
        }
    };

    public refreshToken = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const refreshToken: string = req.body.refreshToken;

            const token = await this._tokenService.verifyToken(refreshToken, TYPETOKEN.REFRESH);
            if (!token) return res.composer.unauthorized(UNAUTHENTICATED);

            const newToken = await this._tokenService.generateTokenAuth(token!.userId);

            return res.composer.success(newToken);
        } catch (err) {
            return res.composer.otherException(err);
        }
    };

    public logout = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const refreshToken = req.body.refreshToken;

            await this._authService.logoutAuth(refreshToken);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);            
        }
    }
}
