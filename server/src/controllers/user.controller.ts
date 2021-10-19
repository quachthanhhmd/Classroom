import "reflect-metadata"

import httpStatus from "http-status";

import { ICreateUser } from './../interfaces/user.interface';
import { IRequest, IResponse } from './../interfaces/api.interface';
import { inject, injectable } from "inversify";

import UserService from "../services/user.service";
import catchAsync from '../utils/CatchAsync';


@injectable()
class UserController {

    constructor(
        @inject("UserService") private readonly userService: UserService) { }

    public signUp = catchAsync(async (
        req: IRequest,
        res: IResponse,
    ): Promise<void> => {
        
        const userBody: ICreateUser = req.body;
        
        const newUser = this.userService.createUser(userBody);

        res.status(httpStatus.CREATED).send({});
    });
}


export default UserController;