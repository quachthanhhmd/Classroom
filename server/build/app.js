"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const config_1 = require("./config");
const env_1 = __importDefault(require("./config/env"));
const config_2 = require("./config");
class App {
    constructor(router, middlewares) {
        this.Start = (port) => {
            return new Promise((resolve, reject) => {
                this.httpServer.listen(port, () => {
                    resolve(port);
                })
                    .on('error', (err) => reject(err));
            });
        };
        this.httpServer = (0, express_1.default)();
        this.port = env_1.default.PORT || 3000;
        this.env = env_1.default.TYPE || 'development';
        this.initializeDatabase();
        this.initializeMiddlewares(middlewares);
        this.initializeRoutes(router);
    }
    initializeDatabase() {
        (0, config_1.connection)();
    }
    initializeRoutes(router) {
        this.httpServer.use("/", router);
    }
    initializeMiddlewares(middlewares) {
        //log method api
        if (env_1.default.TYPE != "test") {
            this.httpServer.use(config_1.successHandler);
            this.httpServer.use(config_1.errorHandler);
        }
        // enable cors
        this.httpServer.use((0, cors_1.default)());
        // parse json request body
        this.httpServer.use(express_1.default.json());
        // parse urlencoded request body
        this.httpServer.use(express_1.default.urlencoded({ extended: true }));
        //this.httpServer.options('*', cors());
        this.httpServer.use(passport_1.default.initialize());
        passport_1.default.use('jwt', config_2.jwtStrategy);
        middlewares.forEach(middleware => this.httpServer.use(middleware));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map