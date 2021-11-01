"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("../../config/inversify");
const env_1 = __importDefault(require("../../config/env"));
const docs_route_1 = __importDefault(require("./docs.route"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const course_route_1 = __importDefault(require("./course.route"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.InitializeRoutes();
    }
    InitializeRoutes() {
        this.router.use("/v1/auth", inversify_1.container.resolve(auth_route_1.default).router);
        this.router.use("/v1/user", inversify_1.container.resolve(user_route_1.default).router);
        this.router.use("/v1/course", inversify_1.container.resolve(course_route_1.default).router);
        if (env_1.default.TYPE === "development") {
            this.router.use("/docs", docs_route_1.default);
        }
    }
}
exports.default = new IndexRoutes().router;
//# sourceMappingURL=index.js.map