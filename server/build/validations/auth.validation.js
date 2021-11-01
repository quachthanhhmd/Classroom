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
exports.AuthValidation = void 0;
const inversify_1 = require("inversify");
const joi_1 = __importDefault(require("joi"));
require("reflect-metadata");
const constants_1 = require("./../constants");
let AuthValidation = class AuthValidation {
    constructor() {
        this.passwordValidation = (value, helper) => {
            if (value.length < 8) {
                return helper.message('password must be at least 8 characters');
            }
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                return helper.message('password must contain at least 1 letter and 1 number');
            }
        };
    }
    SignupValidation() {
        return {
            body: joi_1.default.object().keys({
                firstName: joi_1.default.string().required(),
                lastName: joi_1.default.string().required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().custom(this.passwordValidation).required(),
                birthDay: joi_1.default.date().required(),
                gender: joi_1.default.string().valid(constants_1.GENDER.FEMALE, constants_1.GENDER.MALE, constants_1.GENDER.OTHER),
            })
        };
    }
    SignInValidation() {
        return {
            body: joi_1.default.object().keys({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required(),
            })
        };
    }
    RefreshToken() {
        return {
            body: joi_1.default.object().keys({
                refreshToken: joi_1.default.string().required(),
            })
        };
    }
    Logout() {
        return {
            body: joi_1.default.object().keys({
                refreshToken: joi_1.default.string().required(),
            })
        };
    }
    LoginOAuth() {
        return {
            body: joi_1.default.object().keys({
                email: joi_1.default.string().required(),
                firstName: joi_1.default.string().required(),
                lastName: joi_1.default.string().default(""),
                uid: joi_1.default.string().required(),
                type: joi_1.default.string().valid(constants_1.LOGINTYPE).required(),
                avatarUrl: joi_1.default.string(),
            })
        };
    }
};
AuthValidation = __decorate([
    (0, inversify_1.injectable)()
], AuthValidation);
exports.AuthValidation = AuthValidation;
//# sourceMappingURL=auth.validation.js.map