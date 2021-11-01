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
exports.AuthController = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const constants_1 = require("../constants");
const services_1 = require("../services");
const auth_message_1 = require("./../constants/message/auth.message");
const interfaces_1 = require("./../interfaces");
let AuthController = class AuthController {
    constructor(_userService, _authService, _tokenService) {
        this._userService = _userService;
        this._authService = _authService;
        this._tokenService = _tokenService;
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userBody = req.body;
                const existUser = yield this._userService.findUserbyEmail(userBody.email);
                if (existUser) {
                    return res.composer.badRequest(constants_1.USER_EXIST);
                }
                const newUser = yield this._userService.createUser(userBody);
                if (!newUser) {
                    return res.composer.internalServerError();
                }
                return res.composer.success();
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
        this.signIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this._authService.loginWithEmailAndPassword(email, password);
                if (!user) {
                    return res.composer.badRequest(constants_1.INCORRECT_LOGIN);
                }
                const tokenCreate = yield this._tokenService.generateTokenAuth(user.id);
                return res.composer.success((0, interfaces_1.serializeUserLogin)({
                    user: user,
                    token: tokenCreate,
                }));
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.body.refreshToken;
                const token = yield this._tokenService.verifyToken(refreshToken, constants_1.TYPETOKEN.REFRESH);
                if (!token)
                    return res.composer.unauthorized(auth_message_1.UNAUTHENTICATED);
                const newToken = yield this._tokenService.generateTokenAuth(token.userId);
                return res.composer.success(newToken);
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
        this.loginByOAuth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const userOAuth = yield this._authService.loginOrCreateOAuth(body);
                const tokenCreate = yield this._tokenService.generateTokenAuth(userOAuth.id);
                return res.composer.success((0, interfaces_1.serializeUserLogin)({
                    user: userOAuth,
                    token: tokenCreate,
                }));
            }
            catch (err) {
                res.composer.otherException(err);
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.body.refreshToken;
                yield this._authService.logoutAuth(refreshToken);
                return res.composer.success();
            }
            catch (err) {
                return res.composer.otherException(err);
            }
        });
    }
};
AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("UserService")),
    __param(1, (0, inversify_1.inject)("AuthService")),
    __param(2, (0, inversify_1.inject)("TokenService")),
    __metadata("design:paramtypes", [services_1.UserService,
        services_1.AuthService,
        services_1.TokenService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map