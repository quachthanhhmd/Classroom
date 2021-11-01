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
exports.AuthService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _1 = require("./");
const models_1 = require("../models");
const constants_1 = require("../constants");
let AuthService = class AuthService {
    constructor(_tokenService, _userService, _oAuthService) {
        this._tokenService = _tokenService;
        this._userService = _userService;
        this._oAuthService = _oAuthService;
        /**
         * Login with email and password
         * @param {string} email
         * @param {string} password
         * @returns {Promise<User | null>}
         */
        this.loginWithEmailAndPassword = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userService.findUserbyEmail(email);
            if (!user || !this._userService.isPasswordMatch(user.password, password))
                return null;
            return user;
        });
        /**
         * Logout for user
         * @param refreshToken
         */
        this.logoutAuth = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            yield this._tokenService.removeToken(refreshToken, constants_1.TYPETOKEN.REFRESH);
        });
        /**
         * Login Or Create OAuth
         * @param {ILoginOAuth} bodyCreate
         * @returns {Promise<User> }
         */
        this.loginOrCreateOAuth = (bodyCreate) => __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this._userService.findUserbyEmail(bodyCreate.email);
            if (userExist) {
                yield this._oAuthService.checkOrCreateOAuth(userExist.id, { type: bodyCreate.type, uid: bodyCreate.uid });
                return userExist;
            }
            const newUser = yield this._userService.createUser({
                email: bodyCreate.email,
                firstName: bodyCreate.firstName,
                lastName: (bodyCreate.lastName) ? bodyCreate.lastName : "",
                avatarUrl: bodyCreate.avatarUrl,
                password: (0, models_1.generateRandomPassword)(),
            });
            console.log(5, newUser);
            yield this._oAuthService.checkOrCreateOAuth(newUser.id, { type: bodyCreate.type, uid: bodyCreate.uid });
            return newUser;
        });
    }
};
AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("TokenService")),
    __param(1, (0, inversify_1.inject)("UserService")),
    __param(2, (0, inversify_1.inject)("OAuthService")),
    __metadata("design:paramtypes", [_1.TokenService,
        _1.UserService,
        _1.OAuthService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map