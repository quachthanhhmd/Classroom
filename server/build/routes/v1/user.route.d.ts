import { UserController } from '../../controllers';
import { Authenticate } from "../../middlewares";
import { UserValidation } from "../../validations";
import { IRoute } from './../../interfaces';
declare class UserRoutes {
    private readonly _userController;
    private readonly _userValidation;
    private readonly _authenticate;
    router: IRoute;
    constructor(_userController: UserController, _userValidation: UserValidation, _authenticate: Authenticate);
    private initializeRoutes;
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
