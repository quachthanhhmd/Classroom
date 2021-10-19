import { injectable, inject } from 'inversify';
import {Router} from "express";

import UserController from '../../controllers/user.controller';



@injectable()
class UserRoutes {

    route = Router();

    constructor(@inject("UserController") private readonly userController: UserController) {
        this.initializeRoutes();
    };


    private initializeRoutes() {

        this.route.post(
            "/signup",
            this.userController.signUp
        )
    }
};

export default UserRoutes;