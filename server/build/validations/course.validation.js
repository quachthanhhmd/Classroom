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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const inversify_1 = require("inversify");
const joi_1 = __importDefault(require("joi"));
require("reflect-metadata");
let CourseValidation = class CourseValidation {
    constructor() {
        this.addCourse = () => {
            return joi_1.default.object().keys({
                body: {
                    name: joi_1.default.string().required(),
                    description: joi_1.default.string(),
                    topic: joi_1.default.string(),
                    studentLimit: joi_1.default.number().min(1),
                }
            });
        };
        this.getCourse = () => {
            return joi_1.default.object().keys({
                params: {
                    courseId: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.number())
                }
            });
        };
    }
};
CourseValidation = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], CourseValidation);
exports.CourseValidation = CourseValidation;
//# sourceMappingURL=course.validation.js.map