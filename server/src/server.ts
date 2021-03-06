import * as firebase from "firebase-admin";
import { createServer } from "http";
import App from "./app";
import { logger } from "./config";
import { applyHttpResponseCompose } from "./exceptions/http-response.exception";
import IndexRoutes from "./routes/v1/index";
import { socketServer } from "./socket";

const serviceAccount = require("./google-cert.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});

const port = Number(process.env.PORT) || 5000;

const app: App = new App(IndexRoutes, [applyHttpResponseCompose])

const server = createServer(app.httpServer);
socketServer(server);

server.listen(port, () => {
    logger.info(`Listening to port ${port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    }
    process.exit(1);

};

const unexpectedErrorHandler = (error: any) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});

export default server;