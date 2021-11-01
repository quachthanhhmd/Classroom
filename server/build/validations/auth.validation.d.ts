import Joi from "joi";
import 'reflect-metadata';
export declare class AuthValidation {
    private passwordValidation;
    SignupValidation(): {
        body: Joi.ObjectSchema<any>;
    };
    SignInValidation(): {
        body: Joi.ObjectSchema<any>;
    };
    RefreshToken(): {
        body: Joi.ObjectSchema<any>;
    };
    Logout(): {
        body: Joi.ObjectSchema<any>;
    };
    LoginOAuth(): {
        body: Joi.ObjectSchema<any>;
    };
}
