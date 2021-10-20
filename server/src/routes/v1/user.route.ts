import { Router } from 'express';
import { IRoute } from './../../interfaces/route.interface';
import { injectable, inject } from 'inversify';

import UserController from '../../controllers/user.controller';



@injectable()
class UserRoutes {

    public router : IRoute;

    constructor(@inject("UserController") private readonly userController: UserController) {
        
        this.router = Router();
        this.initializeRoutes();
    };


    private initializeRoutes() {

    
    }
};

export default UserRoutes;


// /**
//  * @swagger
//  * tags:
//  *   name: User
//  *   description: Excecute all problems about user 
//  */

// /**
//  * @swagger
//  * 
//  */