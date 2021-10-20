import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../exceptions/http-response.exception';

//export interface IUserRequest e Request & User;
export interface IRequest extends Request {};
export interface INextFunction extends NextFunction {};


export interface IResponse extends Response {};