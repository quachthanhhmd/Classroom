import express from "express";
import { IRoute } from './interfaces';
declare class App {
    httpServer: express.Application;
    port: string | number;
    env: string;
    constructor(router: IRoute, middlewares: any[]);
    Start: (port: number) => Promise<unknown>;
    private initializeDatabase;
    private initializeRoutes;
    private initializeMiddlewares;
}
export default App;
