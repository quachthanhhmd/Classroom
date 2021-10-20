import 'reflect-metadata';

import { injectable } from 'inversify';

import { GENDER } from './../constants/gender.constant';
import Joi from "joi";

@injectable()
class UserValidation {

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
}

export default UserValidation;