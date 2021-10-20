import { inject, injectable } from "inversify";
import "reflect-metadata";


import { TokenService, UserService } from "./";
import { User } from "../models";

@injectable()
export class AuthService {

    constructor(
        @inject("TokenService") private readonly _tokenService: TokenService,
        @inject("UserService") private readonly _userService: UserService
    ) { }


    public loginWithEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        const user = await this._userService.findUserbyEmail(email);

        if (!user || !this._userService.isPasswordMatch(user.password, password))
            return null;

        return user;
    }
}
