import 'reflect-metadata';

import Joi from "joi";
import { injectable } from 'inversify';

import { GENDER } from './../constants';

@injectable()
export class UserValidation {

    public getUser() {
        return Joi.object().keys({
            params: {
                id: Joi.number().required(),
            }
        })
    } 
}