import { NextFunction, Request, Response } from 'express'
import User from '../models/user.model'

export type IUserRequest = Request & User;
export type IRequest = Request
export type IResponse = Response
export type INextFunction = NextFunction