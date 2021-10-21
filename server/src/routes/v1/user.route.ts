import { Router } from 'express';
import { injectable, inject } from 'inversify';

import { IRoute } from './../../interfaces';
import { UserController } from '../../controllers';
import { validate, Authenticate } from "../../middlewares";
import { UserValidation } from "../../validations";

@injectable()
class UserRoutes {

    public router: IRoute;

    constructor(
        @inject("UserController") private readonly _userController: UserController,
        @inject("UserValidation") private readonly _userValidation: UserValidation,
        @inject("Authenticate") private readonly _authenticate: Authenticate) {

        this.router = Router();
        this.initializeRoutes();
    };


    private initializeRoutes() {
        this.router.get(
            "/:id",
            this._authenticate.authenticate(),
            validate(this._userValidation.getUser),
            this._userController.getUser
        );
    }
};

export default UserRoutes;


/**
 * @swagger
 * tags:
 *   name: User
 *   description: Excecute all problems about user 
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get One User by Id.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path 
 *         name: id 
 *         schema: 
 *           type: number 
 *           required: true
 *     responses:
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError' 
 */