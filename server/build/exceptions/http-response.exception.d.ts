import { IResponse, INextFunction } from './../interfaces';
import { Response } from 'express';
export declare enum HttpResponseStatusCodeEnum {
    SUCCESS,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND
}
export declare class HttpResponse {
    private res;
    constructor(res: Response);
    private json;
    success(payload?: any, message?: string): void;
    badRequest(message?: string, payload?: any): void;
    unauthorized(message?: string, payload?: any): void;
    fobidden(message?: string, payload?: any): void;
    internalServerError(message?: string, payload?: any): void;
    notFound(message?: string, payload?: any): void;
    otherException(error: any): void;
}
export declare function applyHttpResponseCompose(req: any, res: IResponse, next: INextFunction): void;
