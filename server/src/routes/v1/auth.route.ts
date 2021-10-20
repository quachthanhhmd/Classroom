import { Router } from 'express';
import { IRoute } from './../../interfaces/route.interface';
import { injectable, inject } from 'inversify';

import AuthController from '../../controllers/auth.controller';
import AuthValidation from "../../validations/auth.validation";
import validate from "../../middlewares/validate.middleware";

@injectable()
class AuthRoutes {

    public router : IRoute;

    constructor(
        @inject("AuthController") private readonly _authController: AuthController,
        @inject("AuthValidation") private readonly _authValidation: AuthValidation,
        ) {
        
        this.router = Router();
        this.initializeRoutes();
    };


    private initializeRoutes() {

        this.router.post(
            "/signup",
            validate(this._authValidation.SignupValidation),
            this._authController.signUp);
    }
};

export default AuthRoutes;


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Excecute all problems about user 
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: signup account
 *     decription: Signup Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               birthDay:
 *                 type: string
 *             example: 
 *               email: quachthanhhmd05@gmail.com
 *               password: Thanhdeptrai123!
 *               firstName: Hai
 *               lastName: Thanh
 *               gender: male
 *               birthDay: 11/06/2000
 *     responses:
 *       "200":
 *         description: Success
 *       "404":
 *         desciption: user not found
 *         $ref: '#/components/responses/NotFound' 
 */