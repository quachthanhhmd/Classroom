"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const env_1 = __importDefault(require("../config/env"));
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Network",
            version: "1.0.0",
            description: "Build a social network website using typescript, express, sequelize,...",
        },
        servers: [
            {
                url: `http://localhost:${env_1.default.PORT}`,
            },
        ],
    },
    apis: ["./src/docs/*.yml", "./src/routes/v1/*.ts"],
};
//# sourceMappingURL=swaggerOption.js.map