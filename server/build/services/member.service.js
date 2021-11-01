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
exports.MemberService = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const constants_1 = require("../constants");
const role_constant_1 = require("./../constants/role.constant");
let MemberService = class MemberService {
    constructor() {
        /**
         * Find member by UserId and CourseId.
         * @param {number} userId
         * @param {number} courseId
         * @returns {Promise<Member | null>}
         */
        this.findMemberByUserAndCourseId = (userId, courseId) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.Member.findOne({
                where: {
                    [sequelize_1.Op.and]: {
                        userId: userId,
                        courseId: courseId,
                    }
                }
            });
        });
        /**
         * Find user's type
         * @param {number} userId
         * @param {number} courseId
         * @returns {Promise<string | null>}
         */
        this.findMemberState = (userId, courseId) => __awaiter(this, void 0, void 0, function* () {
            const member = yield this.findMemberByUserAndCourseId(userId, courseId);
            if (!member)
                return null;
            return member.type;
        });
        /**
         * Add new member
         * @param {number} userId
         * @param {number} courseId
         * @param {string} role
         * @param {string} state
         * @returns
         */
        this.addMember = (userId, courseId, role = role_constant_1.TYPEROLE.STUDENT, state = constants_1.MEMBERSTATE.SPENDING) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.Member.create({
                userId: userId,
                courseId: courseId,
                role: role,
                type: state,
            });
        });
        /**
         * Update or create member
         * @param {number} userId
         * @param {number} courseId
         * @param {string} role
         * @param {string} state
         * @returns
         */
        this.upsetMember = (userId, courseId, state = constants_1.MEMBERSTATE.SPENDING, role = role_constant_1.TYPEROLE.STUDENT) => __awaiter(this, void 0, void 0, function* () {
            return yield models_1.Member.upsert({
                userId: userId,
                courseId: courseId,
                role: role,
                type: state,
            });
        });
    }
};
MemberService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map