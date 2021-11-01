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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
require("reflect-metadata");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const inversify_1 = require("inversify");
const env_1 = __importDefault(require("../config/env"));
const models_1 = require("../models");
const constants_1 = require("../constants");
let TokenService = class TokenService {
    constructor() {
        /**
         * SAVE TOKEN IN DATABASE
         * @param {ITokenAttributes} token
         * @returns {Promise<Token>} newToken
         */
        this.storeToken = (token) => __awaiter(this, void 0, void 0, function* () {
            const newToken = yield models_1.Token.create({
                token: token.token,
                userId: token.userId,
                type: token.type,
                expire: token.expires.toDate(),
            });
            return newToken;
        });
        /**
         * SAVE TOKEN IN DATABASE
         * @param {ITokenAttributes} token
         * @returns {Promise<Token>} newToken
         */
        this.saveToken = (tokenBody) => __awaiter(this, void 0, void 0, function* () {
            const newToken = yield models_1.Token.create({
                token: tokenBody.token,
                userId: tokenBody.userId,
                type: tokenBody.type,
                expire: tokenBody.expires.toDate(),
            });
            return newToken;
        });
        /**
         * Generate token
         * @param {number} id
         * @param {Moment} expire
         * @param {string} type
         * @returns {string}
         */
        this.generateToken = (userId, expire, type) => {
            const payload = {
                sub: userId,
                iat: (0, moment_1.default)().unix(),
                exp: expire.unix(),
                type: type,
            };
            return jsonwebtoken_1.default.sign(payload, env_1.default.TOKEN.TOKEN_SERCET);
        };
        /**
         * Verify Token
         * @param {string} tokenName
         * @param {string} type
         * @returns {Promise<Token | null>}
         */
        this.verifyToken = (tokenName, type) => __awaiter(this, void 0, void 0, function* () {
            const payload = jsonwebtoken_1.default.verify(tokenName, env_1.default.TOKEN.TOKEN_SERCET);
            const userId = payload.sub === undefined ? -1 : +payload.sub;
            if (userId === -1)
                return null;
            const tokenDoc = yield models_1.Token.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { userId: userId },
                        { token: tokenName },
                        { type: type }
                    ]
                }
            });
            if (!tokenDoc)
                return null;
            //After verify, we need to remove it out of DB
            //Check again
            yield this.removeToken(tokenName, type);
            return tokenDoc;
        });
        /**
        * Generate token to verify email or forgot password
        * @param {numbser} userId
        * @returns {Promise<string>} token after generating
        */
        this.generateTokenVerify = (userId, type) => __awaiter(this, void 0, void 0, function* () {
            //before generateToken we need to remove token has been send before
            yield this.removeTokenByUserId(userId, type);
            const tokenExpire = (0, moment_1.default)().add(env_1.default.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");
            const token = this.generateToken(userId, tokenExpire, type);
            yield this.storeToken({
                userId: userId,
                token: token,
                expires: tokenExpire,
                type: type,
            });
            return token;
        });
        /**
         * generate token to authenticate
         * @param {User} user
         * @returns {<Promise<Object>} access and fresh token
         */
        this.generateTokenAuth = (userId) => __awaiter(this, void 0, void 0, function* () {
            const tokenExpire = (0, moment_1.default)().add(env_1.default.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");
            const generateAccessToken = this.generateToken(userId, tokenExpire, constants_1.TYPETOKEN.ACCESS);
            const tokenRefreshExpire = (0, moment_1.default)().add(env_1.default.TOKEN.TOKEN_EXPIRE_DAY, 'days');
            const generateRefreshExpire = this.generateToken(userId, tokenRefreshExpire, constants_1.TYPETOKEN.REFRESH);
            yield this.storeToken({
                userId: userId,
                token: generateRefreshExpire,
                expires: tokenRefreshExpire,
                type: constants_1.TYPETOKEN.REFRESH,
            });
            return {
                access: {
                    token: generateAccessToken,
                    expire: tokenExpire,
                },
                refresh: {
                    token: generateRefreshExpire,
                    expire: tokenRefreshExpire
                }
            };
        });
        /**
         * REMOVE TOKEN BY TOKEN AND TYPE
         * @param {string} token
         * @param {string} type
         * @return {Promise<void>}
         */
        this.removeToken = (token, type) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.Token.destroy({
                where: {
                    [sequelize_1.Op.and]: {
                        token: token,
                        type: type,
                    }
                }
            });
        });
        /**
         * Remove token by User Id and type
         * @param {number} userId
         * @param {string} type
         * @return {Promise<void>}
         */
        this.removeTokenByUserId = (userId, type) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.Token.destroy({
                where: {
                    [sequelize_1.Op.and]: {
                        userId: userId,
                        type: type,
                    }
                }
            });
        });
    }
};
TokenService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map