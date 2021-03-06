import { injectable } from "inversify";
import Joi from "joi";
import "reflect-metadata";
import { GENDER, LOGINTYPE } from "./../constants";

@injectable()
export class AuthValidation {

    private passwordValidation = (value: string, helper: any) => {
        if (value.length < 8) {
            return helper.message("password must be at least 8 characters");
        }

        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            return helper.message("password must contain at least 1 letter and 1 number");
        }
    }

    public SignupValidation = () => {
        return {
            body: Joi.object().keys({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().custom(this.passwordValidation).required(),
                birthDay: Joi.string().required(),
                gender: Joi.string().valid(GENDER.FEMALE, GENDER.MALE, GENDER.OTHER),
            })
        }
    }

    public SignInValidation = () => {
        return {
            body: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            })
        }
    }

    public RefreshToken = () => {
        return {
            body: Joi.object().keys({
                refreshToken: Joi.string().required(),
            })
        }
    }

    public Logout = () => {
        return {
            body: Joi.object().keys({
                refreshToken: Joi.string().required(),
            })
        }
    }

    public LoginOAuth = () => {
        return {
            body: Joi.object().keys({
                email: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().default(""),
                uid: Joi.string().required(),
                type: Joi.string().valid(LOGINTYPE).required(),
                avatarUrl: Joi.string(),
            })
        }
    }

    public ForgotPassword = () => {
        return Joi.object().keys({
            body: {
                email: Joi.string().required(),
            }
        })
    }
    public CheckForgot = () => {
        return Joi.object().keys({
            body: {
                token: Joi.string().required(),
                email: Joi.string().required(),
            }
        })
    }

    public ResetPassword = () => {
        return Joi.object().keys({
            body: {
                email: Joi.string().required(),
                password: Joi.string().custom(this.passwordValidation).required(),
            }
        })
    }

    public CheckEmailToken = () => {
        return Joi.object().keys({
            body: {
                token: Joi.string().required(),
            }
        })
    }
}
