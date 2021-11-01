import "reflect-metadata";
import { AuthService, TokenService, UserService } from "../services";
import { INextFunction, IRequest, IResponse } from './../interfaces';
export declare class AuthController {
    private readonly _userService;
    private readonly _authService;
    private readonly _tokenService;
    constructor(_userService: UserService, _authService: AuthService, _tokenService: TokenService);
    signUp: (req: IRequest, res: IResponse, next: INextFunction) => Promise<void>;
    signIn: (req: IRequest, res: IResponse, next: INextFunction) => Promise<void>;
    refreshToken: (req: IRequest, res: IResponse) => Promise<void>;
    loginByOAuth: (req: IRequest, res: IResponse) => Promise<void>;
    logout: (req: IRequest, res: IResponse) => Promise<void>;
}
