"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const env_1 = __importDefault(require("./env"));
const models_1 = require("../models");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: env_1.default.DB.DB_DATABASE_NAME,
    host: env_1.default.DB.DB_DATABASE_HOST,
    dialect: env_1.default.DB.DB_DIALECT,
    username: env_1.default.DB.DB_USERNAME,
    password: env_1.default.DB.DB_PASSWORD,
    storage: ':memory:',
    models: [models_1.User, models_1.Token, models_1.Member, models_1.Course, models_1.OAuth],
    query: {
        raw: true,
    }
});
const connection = () => {
    exports.sequelize;
    //sequelize.sync({ force: true });
};
exports.connection = connection;
//# sourceMappingURL=db.js.map