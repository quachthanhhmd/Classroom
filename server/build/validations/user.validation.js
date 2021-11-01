"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
require("reflect-metadata");
const joi_1 = __importDefault(require("joi"));
const inversify_1 = require("inversify");
const constants_1 = require("./../constants");
let UserValidation = class UserValidation {
    getUser() {
        return joi_1.default.object().keys({
            params: {
                id: joi_1.default.number().required(),
            }
        });
    }
    getCourseUser() {
        return joi_1.default.object().keys({
            query: {
                page: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.number()).default(0),
                size: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.number()).default(0),
                order: joi_1.default.string(),
                search: joi_1.default.string(),
            }
        });
    }
    UpdateProfile() {
        return {
            body: joi_1.default.object().keys({
                firstName: joi_1.default.string(),
                lastName: joi_1.default.string(),
                birthDay: joi_1.default.date(),
                gender: joi_1.default.string().valid(constants_1.GENDER.FEMALE, constants_1.GENDER.MALE, constants_1.GENDER.OTHER),
                avatarUrl: joi_1.default.string(),
            })
        };
    }
};
UserValidation = __decorate([
    (0, inversify_1.injectable)()
], UserValidation);
exports.UserValidation = UserValidation;
//# sourceMappingURL=user.validation.js.map