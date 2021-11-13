import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPETOKEN } from "../constants";
import { ILoginOAuth } from "../interfaces";
import { generateRandomPassword, User } from "../models";
import { OAuthService, TokenService, UserService } from "./";

@injectable()
export class AuthService {

    constructor(
        @inject("TokenService") private readonly _tokenService: TokenService,
        @inject("UserService") private readonly _userService: UserService,
        @inject("OAuthService") private readonly _oAuthService: OAuthService,
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

    /**
     * Login Or Create OAuth
     * @param {ILoginOAuth} bodyCreate 
     * @returns {Promise<User> }
     */
    public loginOrCreateOAuth = async (bodyCreate: ILoginOAuth): Promise<User> => {
        const userExist = await this._userService.findUserbyEmail(bodyCreate.email);

        if (userExist) {
            await this._oAuthService.checkOrCreateOAuth(userExist.id, { type: bodyCreate.type, uid: bodyCreate.uid })

            return userExist;
        }

        const newUser = await this._userService.createUser({
            email: bodyCreate.email,
            firstName: bodyCreate.firstName,
            lastName: (bodyCreate.lastName) ? bodyCreate.lastName : "",
            avatarUrl: bodyCreate.avatarUrl,
            password: generateRandomPassword(),
        })
        console.log(5, newUser);
        await this._oAuthService.checkOrCreateOAuth(newUser.id, { type: bodyCreate.type, uid: bodyCreate.uid })

        return newUser;
    }
}
