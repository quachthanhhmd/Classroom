import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INCORRECT_LOGIN, TYPETOKEN, USER_EXIST } from "../constants";
import { AuthService, TokenService, UserService } from "../services";
import { UNAUTHENTICATED } from "./../constants/message/auth.message";
import { serializeUserLogin, ICreateUser, IRequest, IResponse } from "./../interfaces";

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
    ): Promise<void> => {
        try {
            const { email, password } = req.body;

            const user = await this._authService.loginWithEmailAndPassword(email, password);

            if (!user) {
                return res.composer.badRequest(INCORRECT_LOGIN);
            }

            const tokenCreate = await this._tokenService.generateTokenAuth(user.id);

            return res.composer.success(
                serializeUserLogin({
                    user,
                    token: tokenCreate,
                })
            );
        } catch (err) {
            console.log(err);

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

            const newToken = await this._tokenService.generateTokenAuth(token.userId);

            return res.composer.success(newToken);
        } catch (err) {
            return res.composer.unauthorized(UNAUTHENTICATED);
        }
    };

    public loginByOAuth = async (
        req: IRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const body = req.body;

            const userOAuth = await this._authService.loginOrCreateOAuth(body);
            const tokenCreate = await this._tokenService.generateTokenAuth(<number> userOAuth?.id);

            return res.composer.success(
                serializeUserLogin({
                    user: userOAuth,
                    token: tokenCreate,
                })
            );
        } catch (err) {
            res.composer.otherException(err);
        }
    }

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
