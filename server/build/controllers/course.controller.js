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
exports.CourseController = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const interfaces_1 = require("./../interfaces");
const services_1 = require("../services");
let CourseController = class CourseController {
    constructor(_courseService, _userService) {
        this._courseService = _courseService;
        this._userService = _userService;
        this.addCourse = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const courseBody = req.body;
                const newClass = yield this._courseService.createCourse(req.currentUser.id, courseBody);
                return res.composer.success((0, interfaces_1.serializeCourseSummary)(newClass));
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
        this.getCourseDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = +req.params.courseId;
                const course = yield this._courseService.getCourseDetail(courseId);
                if (!course) {
                    {
                        return res.composer.notFound();
                    }
                }
                return res.composer.success((0, interfaces_1.serializeCourseDetail)(course));
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
    }
};
CourseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("CourseService")),
    __param(1, (0, inversify_1.inject)("UserService")),
    __metadata("design:paramtypes", [services_1.CourseService,
        services_1.UserService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map