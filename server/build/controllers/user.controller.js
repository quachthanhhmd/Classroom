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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const services_1 = require("../services");
const course_interface_1 = require("./../interfaces/course.interface");
const user_interface_1 = require("./../interfaces/user.interface");
let UserController = class UserController {
    constructor(_userService, _courseService) {
        this._userService = _userService;
        this._courseService = _courseService;
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const user = yield this._userService.getInforById(id);
                return res.composer.success(user);
            }
            catch (err) {
                res.composer.otherException(err);
            }
        });
        this.getCoursePaging = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.currentUser.id;
                const courseList = yield this._userService.getListCourseUser(id, req.query);
                return res.composer.success((0, course_interface_1.serializeCourseList)(courseList));
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.currentUser.id;
                const body = req.body;
                yield this._userService.updateProfile(userId, body);
                const userAfterUpdate = yield this._userService.findUserById(userId);
                return res.composer.success((0, user_interface_1.serializeUserProfile)(userAfterUpdate));
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
    }
};
UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("UserService")),
    __param(1, (0, inversify_1.inject)("CourseService")),
    __metadata("design:paramtypes", [services_1.UserService,
        services_1.CourseService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map