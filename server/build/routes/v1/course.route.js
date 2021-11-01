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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const inversify_1 = require("inversify");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const validations_1 = require("../../validations");
let CourseRoute = class CourseRoute {
    constructor(_courseController, _authenticate, _courseValidation) {
        this._courseController = _courseController;
        this._authenticate = _authenticate;
        this._courseValidation = _courseValidation;
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", this._authenticate.authenticate(), (0, middlewares_1.validate)(this._courseValidation.addCourse), this._courseController.addCourse);
        this.router.get("/:courseId", this._authenticate.authenticate(), (0, middlewares_1.validate)(this._courseValidation.getCourse), this._courseController.getCourseDetail);
    }
};
CourseRoute = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("CourseController")),
    __param(1, (0, inversify_1.inject)("Authenticate")),
    __param(2, (0, inversify_1.inject)("CourseValidation")),
    __metadata("design:paramtypes", [controllers_1.CourseController,
        middlewares_1.Authenticate,
        validations_1.CourseValidation])
], CourseRoute);
exports.default = CourseRoute;
/**
 * @swagger
 * tags:
 *   name: Course
 *   decription: All problems about courses
 */
/**
 * @swagger
 * /v1/course:
 *   post:
 *     summary: Create a new Course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     description: Create a new Course
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lap trinh ung dung Web
 *               description:
 *                 type: string
 *                 example: Lap trinh ung dung web, su dung Reactjs
 *               studentLimit:
 *                 type: number
 *                 example: 80
 *               topic:
 *                 type: string
 *                 example: LTUDW
 *     responses:
 *       "200":
 *         description: Success
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */ 
//# sourceMappingURL=course.route.js.map