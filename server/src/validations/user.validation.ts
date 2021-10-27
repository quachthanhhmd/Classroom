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

    public getCourseUser() {
        return Joi.object().keys({
            query: {
                page: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ).default(0),
                size: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ).default(0),
                order: Joi.string(),
                search: Joi.string(),
            }
        })
    }

    public UpdateProfile() {
        return {
            body: Joi.object().keys({
                firstName: Joi.string(),
                lastName: Joi.string(),
                birthDay: Joi.date(),
                gender: Joi.string().valid(GENDER.FEMALE, GENDER.MALE, GENDER.OTHER),
                avatarUrl: Joi.string(),
            })
        }
    }
}