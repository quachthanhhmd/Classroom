"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const envSchema = joi_1.default.object()
    .keys({
    TYPE: joi_1.default.string().valid('production', 'development', 'test').required(),
    PORT: joi_1.default.number().default(3000),
    DB_DATABASE_HOST: joi_1.default.string().required(),
    DB_USERNAME: joi_1.default.string().required(),
    DB_PASSWORD: joi_1.default.string().required(),
    DB_DATABASE_NAME: joi_1.default.string().required(),
    DB_DIALECT: joi_1.default.string().required(),
    DB_DATABASE_PORT: joi_1.default.number().default(3306),
    TOKEN_SERCET: joi_1.default.string().required(),
    TOKEN_EXPIRE_DAY: joi_1.default.number().required(),
    TOKEN_EXPIRE_MINUTES: joi_1.default.number().required(),
})
    .unknown();
const { value: env, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.default = {
    TYPE: env.TYPE,
    PORT: env.PORT,
    DB: {
        DB_DATABASE_NAME: env.DB_DATABASE_NAME,
        DB_DATABASE_HOST: env.DB_DATABASE_HOST,
        DB_DATABASE_PORT: env.DB_DATABASE_PORT,
        DB_PASSWORD: env.DB_PASSWORD,
        DB_DIALECT: env.DB_DIALECT,
        DB_USERNAME: env.DB_USERNAME,
    },
    TOKEN: {
        TOKEN_SERCET: env.TOKEN_SERCET,
        TOKEN_EXPIRE_DAY: env.TOKEN_EXPIRE_DAY,
        TOKEN_EXPIRE_MINUTES: env.TOKEN_EXPIRE_MINUTES
    },
};
//# sourceMappingURL=env.js.map