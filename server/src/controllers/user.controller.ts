import "reflect-metadata"

import { inject, injectable } from "inversify";

import { ICreateUser } from './../interfaces/user.interface';
import { IRequest, IResponse } from './../interfaces';
import { UserService } from "../services";



@injectable()
export class UserController {

    constructor(
        @inject("UserService") private readonly userService: UserService) { }

    
}


 