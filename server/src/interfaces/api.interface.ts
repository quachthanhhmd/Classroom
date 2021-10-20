import { NextFunction, Request, Response } from 'express'
import User from '../models/user.model'

//export interface IUserRequest e Request & User;
export interface IRequest extends Request {};
export interface INextFunction extends NextFunction {};

export interface IResponse extends Response {
    
    composer?: any;
}
