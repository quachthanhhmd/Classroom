import cors from "cors";
import express from "express";
import passport from "passport";
import { connection, errorHandler, jwtStrategy, successHandler } from "./config";
import env from "./config/env";
import { IRoute } from "./interfaces";

class App {
    public httpServer: express.Application;
    public port: string | number;
    public env: string;

    constructor(router: IRoute, middlewares: any[]) {
        this.httpServer = express()
        this.port = env.PORT || 3000;
        this.env = env.TYPE || "development";

        this.initializeDatabase();
        this.initializeMiddlewares(middlewares);
        this.initializeRoutes(router);
    }

    public Start = (port: number) => {
        return new Promise((resolve, reject) => {

            this.httpServer.listen(
                port,
                () => {
                    resolve(port)
                })
                .on("error", reject);
        })
    }

    private initializeDatabase = () => {
        connection();
    }
    private initializeRoutes(router: IRoute) {

        this.httpServer.use("/", router);
    }

    private initializeMiddlewares(middlewares: any[]) {

        // log method api
        if (env.TYPE !== "test") {
            this.httpServer.use(successHandler);
            this.httpServer.use(errorHandler);
        }
        // enable cors
        this.httpServer.use(cors());
        // parse json request body
        this.httpServer.use(express.json());

        // parse urlencoded request body
        this.httpServer.use(express.urlencoded({ extended: true }));

        // this.httpServer.options('*', cors());

        this.httpServer.use(passport.initialize());
        passport.use("jwt", jwtStrategy);

        middlewares.forEach((middleware) => this.httpServer.use(middleware));
    }
}

export default App;