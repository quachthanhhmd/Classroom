import { inject, injectable } from "inversify";
import "reflect-metadata";


import { TokenService, UserService } from "./";
import { User } from "../models";
import { TYPETOKEN } from "../constants";

@injectable()
export class AuthService {

    constructor(
        @inject("TokenService") private readonly _tokenService: TokenService,
        @inject("UserService") private readonly _userService: UserService
    ) { }

    /**
     * Login with email and password
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<User | null>}
     */
    public loginWithEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        const user = await this._userService.findUserbyEmail(email);

        if (!user || !this._userService.isPasswordMatch(user.password, password))
            return null;
        return user;
    }

    /**
     * Logout for user 
     * @param refreshToken 
     */
    public logoutAuth = async (refreshToken: string) => {

        await this._tokenService.removeToken(refreshToken, TYPETOKEN.REFRESH);
    }
}
