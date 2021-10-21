import "reflect-metadata"

import { inject, injectable } from "inversify";

import { ICreateUser } from './../interfaces/user.interface';
import { IRequest, IResponse } from './../interfaces';
import { UserService } from "../services";



@injectable()
export class UserController {

    constructor(
        @inject("UserService") private readonly _userService: UserService) { }

    public getUser = async (req: IRequest, res: IResponse): Promise<void> => {
        try {
            const id = +req.params.id;

            const user = await this._userService.getInforById(id);

            return res.composer.success({ user });
        } catch (err) {
            res.composer.otherException(err);
        }
    }
}


