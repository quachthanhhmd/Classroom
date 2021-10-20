import { IResponse, INextFunction, IRequest } from './../interfaces';
import { Response } from 'express';
import httpStatus from 'http-status';


export enum HttpResponseStatusCodeEnum {
    SUCCESS = httpStatus.OK,
    BAD_REQUEST = httpStatus.BAD_REQUEST,
    UNAUTHORIZED = httpStatus.UNAUTHORIZED,
    FORBIDDEN = httpStatus.FORBIDDEN,
    NOT_FOUND = httpStatus.NOT_FOUND,
}

export class HttpResponse {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    private json(code: number, message: string, payload?: any) {
        this.res.status(code).send({
            code,
            message,
            payload
        });
    }

    public success(payload?: any, message = ``,): void {
        return this.json(
            HttpResponseStatusCodeEnum.SUCCESS,
            message,
            payload
        );
    }

    public badRequest(message = `Bad Request`, payload?: any): void {
        return this.json(
            HttpResponseStatusCodeEnum.BAD_REQUEST,
            message,
            payload,
        );
    }

    public unauthorized(message = `Authorization Failed`, payload?: any): void {
        return this.json(
            HttpResponseStatusCodeEnum.UNAUTHORIZED,
            message,
            payload,
        )
    }

    public fobidden(message = `Forbidden`, payload?: any): void {
        return this.json(
            HttpResponseStatusCodeEnum.FORBIDDEN,
            message,
            payload,
        )
    }

    public notFound(message = `Not Found`, payload?: any): void {

        return this.json(
            HttpResponseStatusCodeEnum.NOT_FOUND,
            message,
            payload,
        )
    }

    public otherException(error: any) {
        if (typeof error === "object") {
            const errorCode = +error.code || 404;
            return this.json(errorCode, error.message);
        }

        if (Array.isArray(error)) {
            const errors = error.map(err => {
                return {
                    code: +err.code,
                    message: err.message
                }
            });

            return this.json(HttpResponseStatusCodeEnum.BAD_REQUEST, "", errors);
        }
    }
}

export function applyHttpResponseCompose(
    req: IRequest,
    res: IResponse,
    next: INextFunction): void {
    res.composer = new HttpResponse(res);
    next();
}