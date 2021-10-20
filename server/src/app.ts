import { IRoute } from './interfaces/route.interface';
import httpStatus from 'http-status';

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
//----

import morgan from './config/morgan';
import env from "./config/env";
import routes from "./routes/v1/index";
import sequelize from "./config/db";

import { errorHandler, errorConverter } from "./middlewares/error.middleware";



class App {
    public httpServer: express.Application;
    public port: string | number;
    public env: string;

    constructor(router: IRoute, middlewares: any[]) {
        this.httpServer = express()
        this.port = env.PORT || 3000;
        this.env = env.TYPE || 'development';

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
                .on('error', (err: object) => reject(err));
        })
    }

    private initializeDatabase() {
        sequelize.sync();
    }
    private initializeRoutes(router: IRoute) {
        
        this.httpServer.use("/", router);
    }

    private initializeMiddlewares(middlewares : any[]) {

         //log method api
         if (env.TYPE != "test") {
            this.httpServer.use(morgan.successHandler);
            this.httpServer.use(morgan.errorHandler);
        }

        // parse json request body
        this.httpServer.use(express.json());

        // parse urlencoded request body
        this.httpServer.use(express.urlencoded({ extended: true }));

        // enable cors
        this.httpServer.use(cors());
        //this.httpServer.options('*', cors());

        //this.httpServer.use(passport.initialize());

        this.httpServer.use("/", routes);

        this.httpServer.use(errorConverter);
        this.httpServer.use(errorHandler);

        middlewares.forEach(middleware => {
            this.httpServer.use(middleware);
        })
    }
}

export default App;