import { Request } from "express";
import morgan from "morgan";
import { logger } from "./";
import { IResponse } from "./../interfaces/api.interface";
import env from "./env";

morgan.token("message", (_req: Request, res: IResponse) => res.locals.errorMessage || "");

const getIpFormat = (): string => (env.TYPE === "production" ? ":remote-addr - " : "");
const successResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
    skip: (_req: Request, res: IResponse) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
    skip: (_req: Request, res: IResponse) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message) },
});
