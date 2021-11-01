"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordHash = exports.initPasswordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
/**
 *
 * @param password
 * @returns {<Promise>String}
 */
const initPasswordHash = (password) => {
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.initPasswordHash = initPasswordHash;
/**
 *
 * @param passwordDB
 * @param passwordInput
 * @returns {<Promise>Boolean}
 */
const comparePasswordHash = (passwordDB, passwordInput) => {
    return bcrypt_1.default.compareSync(passwordInput, passwordDB);
};
exports.comparePasswordHash = comparePasswordHash;
//# sourceMappingURL=bcrypt.js.map