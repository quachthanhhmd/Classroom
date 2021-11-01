import "reflect-metadata";
import { ILoginOAuth } from "../interfaces";
import { OAuthService, TokenService, UserService } from "./";
import { User } from "../models";
export declare class AuthService {
    private readonly _tokenService;
    private readonly _userService;
    private readonly _oAuthService;
    constructor(_tokenService: TokenService, _userService: UserService, _oAuthService: OAuthService);
    /**
     * Login with email and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<User | null>}
     */
    loginWithEmailAndPassword: (email: string, password: string) => Promise<User | null>;
    /**
     * Logout for user
     * @param refreshToken
     */
    logoutAuth: (refreshToken: string) => Promise<void>;
    /**
     * Login Or Create OAuth
     * @param {ILoginOAuth} bodyCreate
     * @returns {Promise<User> }
     */
    loginOrCreateOAuth: (bodyCreate: ILoginOAuth) => Promise<User>;
}
