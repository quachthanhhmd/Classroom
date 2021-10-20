import "reflect-metadata"

import httpStatus from "http-status";

import { ICreateUser } from './../interfaces/user.interface';
import { IRequest, IResponse } from './../interfaces/api.interface';
import { inject, injectable } from "inversify";

import UserService from "../services/user.service";



@injectable()
class UserController {

    constructor(
        @inject("UserService") private readonly userService: UserService) { }

    
}


export default UserController;