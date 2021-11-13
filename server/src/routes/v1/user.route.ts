import { Router } from "express";
import { inject, injectable } from "inversify";
import { UserController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { UserValidation } from "../../validations";
import { IRoute } from "./../../interfaces";

@injectable()
class UserRoutes {
    public router: IRoute;

    constructor(
        @inject("UserController") private readonly _userController: UserController,
        @inject("UserValidation") private readonly _userValidation: UserValidation,
        @inject("Authenticate") private readonly _authenticate: Authenticate) {

        this.router = Router();
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            "/:id",
            this._authenticate.authenticate(),
            validate(this._userValidation.getUser),
            this._userController.getUser
        );

        this.router.get(
            "/",
            this._authenticate.authenticate(),
            validate(this._userValidation.getCourseUser),
            this._userController.getCoursePaging
        );

        this.router.patch(
            "/",
            this._authenticate.authenticate(),
            validate(this._userValidation.UpdateProfile),
            this._userController.updateProfile
        )
    }
}

export default UserRoutes;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Excecute all problems about user 
 */

/**
 * @swagger
 * /v1/user/{id}:
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

/**
 * @swagger
 * /v1/user:
 *   get:
 *     summary: Get user's Course List by paging
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page 
 *         schema: 
 *           type: number 
 *           example: 1
 *       - in: query
 *         name: size 
 *         schema: 
 *           type: number 
 *           example: 8
 *     responses:
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalError' 
 */