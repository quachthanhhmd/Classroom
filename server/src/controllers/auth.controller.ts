import "reflect-metadata"

import httpStatus from "http-status";

import { ICreateUser } from './../interfaces/user.interface';
import { IRequest, IResponse, INextFunction } from './../interfaces/api.interface';
import { inject, injectable } from "inversify";

import UserService from "../services/user.service";

import { HttpResponse } from "../exceptions/http-response.exception";


@injectable()
class AuthController {

    constructor(
        @inject("UserService") private readonly userService: UserService) { }

    public signUp = async (
        req: IRequest,
        res: IResponse,
        next: INextFunction
    ): Promise<void> => {
        try{
            
            const userBody: ICreateUser = req.body;
        
            console.log(userBody);
            const newUser = await this.userService.createUser(userBody);

            //res.status(httpStatus.CREATED).send({});

            res.status(httpStatus.OK).send({
                user: newUser,
            })
        }catch(err){
            next(err);
        }
    };
}


export default AuthController;