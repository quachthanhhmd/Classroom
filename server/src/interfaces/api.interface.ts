import { User } from './../models';
import { NextFunction, Request, Response } from 'express';
import { IPagingParams } from "../models";


export interface IRequest extends Request {

};
export interface INextFunction extends NextFunction { };
export interface IResponse extends Response { };
export interface IAuthorizeRequest extends Request {
    currentUser?: User;
};
export interface IPagingRequest extends Request<any, any, any, IPagingParams> {
    currentUser?: User;
}