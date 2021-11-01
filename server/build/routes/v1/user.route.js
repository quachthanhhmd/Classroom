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
const middlewares_1 = require("../../middlewares");
const validations_1 = require("../../validations");
let UserRoutes = class UserRoutes {
    constructor(_userController, _userValidation, _authenticate) {
        this._userController = _userController;
        this._userValidation = _userValidation;
        this._authenticate = _authenticate;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    ;
    initializeRoutes() {
        this.router.get("/:id", this._authenticate.authenticate(), (0, middlewares_1.validate)(this._userValidation.getUser), this._userController.getUser);
        this.router.get('/', this._authenticate.authenticate(), (0, middlewares_1.validate)(this._userValidation.getCourseUser), this._userController.getCoursePaging);
        this.router.patch("/", this._authenticate.authenticate(), (0, middlewares_1.validate)(this._userValidation.UpdateProfile), this._userController.updateProfile);
    }
};
UserRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("UserController")),
    __param(1, (0, inversify_1.inject)("UserValidation")),
    __param(2, (0, inversify_1.inject)("Authenticate")),
    __metadata("design:paramtypes", [controllers_1.UserController,
        validations_1.UserValidation,
        middlewares_1.Authenticate])
], UserRoutes);
;
exports.default = UserRoutes;
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
//# sourceMappingURL=user.route.js.map