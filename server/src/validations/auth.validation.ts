import 'reflect-metadata';

import Joi from "joi";
import { injectable } from 'inversify';

import { GENDER } from './../constants';

@injectable()
export class AuthValidation {

    private passwordValidation = (value: string, helper: any) => {
        if (value.length < 8) {
            return helper.message('password must be at least 8 characters');
        }

        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            return helper.message('password must contain at least 1 letter and 1 number');
        }
    }

    public SignupValidation() {
        return {
            body: Joi.object().keys({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().custom(this.passwordValidation).required(),
                birthDay: Joi.date().required(),
                gender: Joi.string().valid(GENDER.FEMALE, GENDER.MALE, GENDER.OTHER),
            })
        }
    }

    public SignInValidation() {
        return {
            body: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            })
        }
    }

    public RefreshToken() {
        return {
            body:  Joi.object().keys({
                refreshToken: Joi.string().required(),
            })
        }
    }

    public Logout() {
        return {
            body: Joi.object().keys({
                refreshToken: Joi.string().required(),
            })
        }
    }
}
