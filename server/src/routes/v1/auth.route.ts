import { Router } from 'express';
import { IRoute } from './../../interfaces/route.interface';
import { injectable, inject } from 'inversify';

import { AuthController } from '../../controllers';
import { AuthValidation } from "../../validations";
import { validate } from "../../middlewares";

@injectable()
class AuthRoutes {

    public router: IRoute;

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
            this._authController.signUp
        );

        this.router.post(
            "/signin",
            validate(this._authValidation.SignInValidation),
            this._authController.signIn
        );
        
        this.router.post(
            "/refresh-token",
            validate(this._authValidation.RefreshToken),
            this._authController.refreshToken
        );
        
        this.router.post(
            "/logout",
            validate(this._authValidation.Logout),
            this._authController.logout,
        )
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
 * /v1/auth/signup:
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
 *               password: Thanhdeptrai123
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

/**
 * @swagger
 * /v1/auth/signin:
 *   post:
 *     summary: Login by username and password
 *     tags: [Auth]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *              example:
 *                username: quachthanhhmd05@gmail.com
 *                password: Thanhdeptrai123
 *
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/Token'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *          $ref: '#/components/responses/InternalError'
 *
 */


/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "200":
 *         description: Logout success
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /v1/auth/refresh-token:
 *   post:
 *     summary: Refresh Token 
 *     tags: [Auth]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string 
 *             example: 
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     responses:
 *       "200":
 *         description: Refresh token success
 *         $ref: '#/components/Token'
 *       "401":
 *          $ref: '#/components/responses/Unauthorized'
 *                
 */