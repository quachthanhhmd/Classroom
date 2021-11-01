"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyHttpResponseCompose = exports.HttpResponse = exports.HttpResponseStatusCodeEnum = void 0;
const http_status_1 = __importDefault(require("http-status"));
var HttpResponseStatusCodeEnum;
(function (HttpResponseStatusCodeEnum) {
    HttpResponseStatusCodeEnum[HttpResponseStatusCodeEnum["SUCCESS"] = http_status_1.default.OK] = "SUCCESS";
    HttpResponseStatusCodeEnum[HttpResponseStatusCodeEnum["BAD_REQUEST"] = http_status_1.default.BAD_REQUEST] = "BAD_REQUEST";
    HttpResponseStatusCodeEnum[HttpResponseStatusCodeEnum["UNAUTHORIZED"] = http_status_1.default.UNAUTHORIZED] = "UNAUTHORIZED";
    HttpResponseStatusCodeEnum[HttpResponseStatusCodeEnum["FORBIDDEN"] = http_status_1.default.FORBIDDEN] = "FORBIDDEN";
    HttpResponseStatusCodeEnum[HttpResponseStatusCodeEnum["INTERNAL_SERVER_ERROR"] = http_status_1.default.INTERNAL_SERVER_ERROR] = "INTERNAL_SERVER_ERROR";
    HttpResponseStatusCodeEnum[HttpResponseStatusCodeEnum["NOT_FOUND"] = http_status_1.default.NOT_FOUND] = "NOT_FOUND";
})(HttpResponseStatusCodeEnum = exports.HttpResponseStatusCodeEnum || (exports.HttpResponseStatusCodeEnum = {}));
class HttpResponse {
    constructor(res) {
        this.res = res;
    }
    json(code, message, payload) {
        this.res.status(code).send({
            code,
            message,
            payload
        });
    }
    success(payload, message = ``) {
        return this.json(HttpResponseStatusCodeEnum.SUCCESS, message, payload);
    }
    badRequest(message = `Bad Request`, payload) {
        return this.json(HttpResponseStatusCodeEnum.BAD_REQUEST, message, payload);
    }
    unauthorized(message = `Authorization Failed`, payload) {
        return this.json(HttpResponseStatusCodeEnum.UNAUTHORIZED, message, payload);
    }
    fobidden(message = `Forbidden`, payload) {
        return this.json(HttpResponseStatusCodeEnum.FORBIDDEN, message, payload);
    }
    internalServerError(message = `Internal Server Error`, payload) {
        return this.json(HttpResponseStatusCodeEnum.INTERNAL_SERVER_ERROR, message, payload);
    }
    notFound(message = `Not Found`, payload) {
        return this.json(HttpResponseStatusCodeEnum.NOT_FOUND, message, payload);
    }
    otherException(error) {
        if (typeof error === "object") {
            const errorCode = +error.code || 404;
            return this.json(errorCode, error.message);
        }
        if (Array.isArray(error)) {
            const errors = error.map(err => {
                return {
                    code: +err.code,
                    message: err.message
                };
            });
            return this.json(HttpResponseStatusCodeEnum.BAD_REQUEST, "", errors);
        }
    }
}
exports.HttpResponse = HttpResponse;
function applyHttpResponseCompose(req, res, next) {
    res.composer = new HttpResponse(res);
    next();
}
exports.applyHttpResponseCompose = applyHttpResponseCompose;
//# sourceMappingURL=http-response.exception.js.map