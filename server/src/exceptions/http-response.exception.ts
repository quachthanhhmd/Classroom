import { IResponse, INextFunction, IRequest } from './../interfaces/api.interface';
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

    private json(code: number, message: string, payload: string) {
        this.res.status(code).send({
            code,
            message,
            payload
        });
    }

    public success(payload: any, message = ``): void {
        return this.json(
            HttpResponseStatusCodeEnum.SUCCESS,
            message,
            payload
        );
    }

    public badRequest(payload: any, message = `Bad Request`): void {
        return this.json(
            HttpResponseStatusCodeEnum.BAD_REQUEST,
            message,
            payload,
        );
    }

    public unauthorized(payload: any, message = `Authorization Failed`): void {
        return this.json(
            HttpResponseStatusCodeEnum.UNAUTHORIZED,
            message,
            payload,
        )
    }

    public fobidden(payload: any, message = `Forbidden`): void {
        return this.json(
            HttpResponseStatusCodeEnum.FORBIDDEN,
            message,
            payload,
        )
    }

    public notFound(payload: any, message = `Not Found`): void {

        return this.json(
            HttpResponseStatusCodeEnum.NOT_FOUND,
            message,
            payload,
        )
    }
}

export function applyHttpResponseCompose(
    req: IRequest,
    res: IResponse,
    next: INextFunction): void {
    res.composer = new HttpResponse(res);
    next();
}