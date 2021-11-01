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
exports.CourseService = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const models_1 = require("../models");
const _1 = require("./");
const constants_1 = require("../constants");
let CourseService = class CourseService {
    constructor(_memberService) {
        this._memberService = _memberService;
        /**
         * Create a new class.
         * @param id
         * @param courseBody
         * @returns
         */
        this.createCourse = (id, courseBody) => __awaiter(this, void 0, void 0, function* () {
            const newCourse = yield models_1.Course.create(Object.assign({ ownerId: id }, courseBody));
            yield this._memberService.addMember(id, newCourse.id, constants_1.TYPEROLE.TEACHER, constants_1.MEMBERSTATE.ACCEPT);
            return newCourse;
        });
        this.getCourseDetail = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.Course.findByPk(id);
        });
    }
};
CourseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("MemberService")),
    __metadata("design:paramtypes", [_1.MemberService])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map