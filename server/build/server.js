"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const http_response_exception_1 = require("./exceptions/http-response.exception");
const index_1 = __importDefault(require("./routes/v1/index"));
const port = parseInt(process.env.PORT || '5000');
const app = new app_1.default(index_1.default, [http_response_exception_1.applyHttpResponseCompose]);
const server = (0, http_1.createServer)(app.httpServer);
server.listen(port, () => {
    config_1.logger.info(`Listening to port ${port}`);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            config_1.logger.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    config_1.logger.error(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    config_1.logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
exports.default = server;
//# sourceMappingURL=server.js.map