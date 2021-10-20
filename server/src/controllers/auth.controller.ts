import "reflect-metadata"

import { inject, injectable } from "inversify";

import { UserService, AuthService, TokenService } from "../services";
import { IRequest, IResponse, INextFunction } from './../interfaces';
import { INCORRECT_LOGIN, USER_EXIST } from "../constants";
import { ICreateUser } from './../interfaces';


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
            if (!existUser) {
                return res.composer.badRequest(USER_EXIST);
            }

            const newUser = await this._userService.createUser(userBody);
            if (newUser) {
                return res.composer.badRequest();
            }

            return res.composer.success({ user: newUser });
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
            const { username, password } = req.body;
            const user = await this._authService.loginWithEmailAndPassword(username, password);

            if (!user) {
                return res.composer.badRequest(INCORRECT_LOGIN);
            }

            const tokenCreate = await this._tokenService.generateTokenAuth(user!.id);

            return res.composer.success(
                {
                    user: user,
                    token: tokenCreate,
                }
            );
        } catch (err) {
            return res.composer.otherException(err);
        }
    };
}
