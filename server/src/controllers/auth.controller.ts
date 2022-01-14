import { inject, injectable } from "inversify";
import "reflect-metadata";
import { sendActivationAccount, sendMailForgotPassword } from "../config/nodemailer";
import { INCORRECT_LOGIN, TYPETOKEN, USER_EXIST } from "../constants";
import { AuthService, NotificationService, TokenService, UserService } from "../services";
import { UNAUTHENTICATED } from "./../constants/message/auth.message";
import { serializeUserLogin, ICreateUser, IRequest, IResponse } from "./../interfaces";

@injectable()
export class AuthController {
    constructor(
        @inject("UserService") private readonly _userService: UserService,
        @inject("AuthService") private readonly _authService: AuthService,
        @inject("TokenService") private readonly _tokenService: TokenService,
        @inject("NotificationService") private readonly _notificationService: NotificationService

    ) { }

    public signUp = async (
        req: IRequest,
        res: IResponse,
    ): Promise<void> => {
        try {

            const userBody = req.body;

            const existUser = await this._userService.findUserbyEmail(userBody.email);
            if (existUser) {
                return res.composer.badRequest(USER_EXIST);
            }

            if (typeof userBody.birthDay === "string") {
                const birthDay = userBody.birthDay;
                delete userBody.birthDay;
                userBody.birthDay = new Date(birthDay);
            }

            const newUser = await this._userService.createUser(userBody);
            if (!newUser) {
                return res.composer.internalServerError();
            }
            const tokenSendEmail = await this._tokenService.generateTokenVerify(newUser.id, TYPETOKEN.VERIFY_EMAIL);
            await sendActivationAccount(req, newUser.email, tokenSendEmail);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

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

            if (user.isBlocked) {
                return res.composer.success(null, "IS_BLOCKED");
            }

            if (!user.isVerified) {
                return res.composer.success(null, "UN_VERIFY");
            }
            // const notificationList = await this._notificationService.getAllNotificationUser(user.id);

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
    }

    public refreshToken = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const refreshToken: string = req.body.refreshToken;

            const token = await this._tokenService.verifyToken(refreshToken, TYPETOKEN.REFRESH);
            if (!token) { return res.composer.unauthorized(UNAUTHENTICATED); }

            const newToken = await this._tokenService.generateTokenAuth(token.userId);

            return res.composer.success(newToken);
        } catch (err) {
            return res.composer.unauthorized(UNAUTHENTICATED);
        }
    }

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

    public sendEmailForgotPassword = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const { email } = req.body;

            const user = await this._userService.findUserbyEmail(email);

            if (!user) return res.composer.notFound();

            const newToken = await this._tokenService.generateTokenVerify(user.id, TYPETOKEN.VERIFY_EMAIL);

            sendMailForgotPassword(req, user.email, newToken);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public checkForgotPassword = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const { email, token } = req.body;

            const user = await this._userService.findUserbyEmail(email);
            if (!user) return res.composer.notFound();

            const TokenAuth = await this._tokenService.verifyToken(token, TYPETOKEN.VERIFY_EMAIL);

            if (!TokenAuth || TokenAuth.userId !== user.id) {
                return res.composer.forbidden();
            }

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public resetPassword = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            const user = await this._userService.findUserbyEmail(email);

            if (!user) return res.composer.notFound();

            await this._userService.updatePassword(user.id, password);

            return res.composer.success();
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
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

    public verifyEmail = async (
        req: IRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const token: string = req.body.token;

            const tokenDoc = await this._tokenService.verifyToken(token, TYPETOKEN.VERIFY_EMAIL);

            if (!tokenDoc) {
                return res.composer.notFound();
            }

            await this._userService.updateProfile(tokenDoc.id, { isVerified: true });

            return res.composer.success();
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }
}
