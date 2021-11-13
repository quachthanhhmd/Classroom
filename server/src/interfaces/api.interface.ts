import { NextFunction, Request, Response } from "express";
import { IPagingParams } from "../models";
import { User } from "./../models";

// tslint:disable-next-line:no-empty-interface
export interface IRequest extends Request {

}
// tslint:disable-next-line:no-empty-interface
export interface INextFunction extends NextFunction { }
// tslint:disable-next-line:no-empty-interface
export interface IResponse extends Response { }
export interface IAuthorizeRequest extends Request {
    currentUser?: User;
}
export interface IPagingRequest extends Request<any, any, any, IPagingParams> {
    currentUser?: User;
}