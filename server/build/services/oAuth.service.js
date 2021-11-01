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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
let OAuthService = class OAuthService {
    constructor() {
        /**
         *
         * @param {number} userId
         * @param {string} uid
         * @returns {Promise<OAuth | null>}
         */
        this.findOAuthByUserIdAndUId = (userId, uid) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.OAuth.findOne({
                where: {
                    [sequelize_1.Op.and]: {
                        userId: userId,
                        uid: uid,
                    }
                }
            });
        });
        /**
         * Create New OAuth connection
         * @param {number} userId
         * @param {IOAuthRequest} bodyOAuth
         * @returns {Promise<OAuth | null> }
         */
        this.createNewOAuth = (userId, bodyOAuth) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.OAuth.create(Object.assign({ userId: userId }, bodyOAuth));
        });
        /**
         * Check or Create OAuth
         * @param {number} userId
         * @param {IOAuthRequest} bodyOAuth
         * @returns {Promise<OAuth | null> }
         */
        this.checkOrCreateOAuth = (userId, bodyOAuth) => __awaiter(this, void 0, void 0, function* () {
            const oAuthExist = yield this.findOAuthByUserIdAndUId(userId, bodyOAuth.uid);
            if (oAuthExist) {
                return yield this.createNewOAuth(userId, bodyOAuth);
            }
            return null;
        });
    }
};
OAuthService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], OAuthService);
exports.OAuthService = OAuthService;
//# sourceMappingURL=oAuth.service.js.map