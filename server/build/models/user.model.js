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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const bcrypt_1 = require("../config/bcrypt");
const _1 = require("./");
const gender_constant_1 = require("./../constants/gender.constant");
const oAuth_model_1 = require("./oAuth.model");
let User = class User extends sequelize_typescript_1.Model {
    set password(value) {
        console.log("3, ", value);
        if (typeof value === "undefined") {
            const passwordHash = (0, bcrypt_1.initPasswordHash)((0, exports.generateRandomPassword)());
            this.setDataValue("password", passwordHash);
            return;
        }
        if (value.length < 8) {
            throw new Error('password must be at least 8 characters');
        }
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('password must contain at least 1 letter and 1 number');
        }
        const passwordHash = (0, bcrypt_1.initPasswordHash)(value);
        this.setDataValue("password", passwordHash);
    }
    get password() {
        return this.getDataValue("password");
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER.UNSIGNED),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Index)("email-index"),
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], User.prototype, "birthDay", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(gender_constant_1.GENDER.MALE),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(gender_constant_1.GENDER.FEMALE, gender_constant_1.GENDER.MALE, gender_constant_1.GENDER.OTHER)),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "isBlocked", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], User.prototype, "password", null);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => _1.Token),
    __metadata("design:type", Array)
], User.prototype, "tokenList", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => _1.Member),
    __metadata("design:type", Array)
], User.prototype, "memberList", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => oAuth_model_1.OAuth),
    __metadata("design:type", Array)
], User.prototype, "oAuthList", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
    })
], User);
exports.User = User;
;
const generateFromList = (strList, length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += strList.charAt(Math.floor(Math.random() * strList.length));
    }
    return result;
};
const generateRandomPassword = (length = 15) => {
    const upperCaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseList = "abcdefghijklmnopqrstuvwxyz";
    const numberList = "0123456789";
    const upperCaseLength = Math.floor(Math.random() * (length - 3) + 1);
    const lowerCaseLength = Math.floor(Math.random() * (length - upperCaseLength - 1) + 1);
    const numberLength = Math.floor(Math.random() * (length - upperCaseLength - lowerCaseLength - 1) + 1);
    console.log(upperCaseLength, lowerCaseLength, numberLength);
    const result = generateFromList(upperCaseList, upperCaseLength) + generateFromList(lowerCaseList, lowerCaseLength) + generateFromList(numberList, numberLength);
    console.log(result);
    return result
        .split('')
        .sort((a, b) => 0.5 - Math.random())
        .join('');
};
exports.generateRandomPassword = generateRandomPassword;
//# sourceMappingURL=user.model.js.map