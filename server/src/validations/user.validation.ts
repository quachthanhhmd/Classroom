import { injectable } from "inversify";
import Joi from "joi";
import "reflect-metadata";
import { GENDER } from "./../constants";

@injectable()
export class UserValidation {
    public getUser = () => {
        return Joi.object().keys({
            params: {
                id: Joi.number().required(),
            }
        })
    }

    public getCourseUser = () => {
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

    public UpdateProfile = () => {
        return {
            body: Joi.object().keys({
                firstName: Joi.string(),
                lastName: Joi.string(),
                birthDay: Joi.string(),
                gender: Joi.string().valid(GENDER.FEMALE, GENDER.MALE, GENDER.OTHER),
                avatarUrl: Joi.string(),
            })
        }
    }

    public UpdatePassword = () => {
        return {
            body: Joi.object().keys({
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().required(),
            })
        }
    }
}