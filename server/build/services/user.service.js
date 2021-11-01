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
exports.UserService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const config_1 = require("../config");
const models_1 = require("../models");
let UserService = class UserService {
    constructor() {
        /**
         * find a user by Id
         * @param {number} id
         * @return {Promise<User | null>}
         */
        this.findUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findByPk(id);
            return user;
        });
        /**
         * Check user exists or not
         * @param {number} id
         * @returns {Promise<Boolean>}
         */
        this.isUserExist = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserById(id);
            if (user)
                return true;
            return false;
        });
        /**
         * Find User by email
         * @param {string} email
         * @returns
         */
        this.findUserbyEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({
                where: {
                    email: email,
                }
            });
            return user;
        });
        /**
         * Create User
         * @param userBody
         * @returns
         */
        this.createUser = (userBody) => __awaiter(this, void 0, void 0, function* () {
            console.log(userBody);
            return yield models_1.User.create(userBody);
        });
        /**
         * Get only information of user
         * @param {number} id
         * @returns {Promise<User | null>} is information of user
         */
        this.getInforById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.User.findOne({
                attributes: ["id", "firstName", "lastName", "gender", "birthDay", "email", "avatarUrl"],
                where: {
                    id: id,
                }
            });
        });
        /**
         * check password match
         * @param {string} userPassword
         * @param {string} inputPassword
         * @returns {Boolean}
         */
        this.isPasswordMatch = (userPassword, inputPassword) => {
            if ((0, config_1.comparePasswordHash)(userPassword, inputPassword))
                return true;
            return false;
        };
        /**
        * Find list Courses
        * @param {IPagingParams} queryBody
        * @returns {Promise<IPagingResult<Course>>}
        */
        this.getListCourseUser = (userId, queryBody) => __awaiter(this, void 0, void 0, function* () {
            const whereCondition = {
                include: [{
                        model: models_1.Member,
                        where: {
                            userId: userId,
                        }
                    }],
                raw: false,
            };
            return yield (0, models_1.filterPagination)(models_1.Course, whereCondition, queryBody);
        });
        /**
         * Update user
         * @param {number} userId
         * @param {updateUser} userBody
         */
        this.updateProfile = (userId, userBody) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.User.update(userBody, {
                where: {
                    id: userId
                }
            });
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map