"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("inversify");
const controllers_1 = require("../../controllers");
const validations_1 = require("../../validations");
const middlewares_1 = require("../../middlewares");
let AuthRoutes = class AuthRoutes {
    constructor(_authController, _authValidation) {
        this._authController = _authController;
        this._authValidation = _authValidation;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    ;
    initializeRoutes() {
        this.router.post("/signup", (0, middlewares_1.validate)(this._authValidation.SignupValidation), this._authController.signUp);
        this.router.post("/signin", (0, middlewares_1.validate)(this._authValidation.SignInValidation), this._authController.signIn);
        this.router.post("/refresh-token", (0, middlewares_1.validate)(this._authValidation.RefreshToken), this._authController.refreshToken);
        this.router.post("/logout", (0, middlewares_1.validate)(this._authValidation.Logout), this._authController.logout);
        this.router.post("/login-oauth", (0, middlewares_1.validate)(this._authValidation.LoginOAuth), this._authController.loginByOAuth);
    }
};
AuthRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("AuthController")),
    __param(1, (0, inversify_1.inject)("AuthValidation")),
    __metadata("design:paramtypes", [controllers_1.AuthController,
        validations_1.AuthValidation])
], AuthRoutes);
;
exports.default = AuthRoutes;
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
//# sourceMappingURL=auth.route.js.map