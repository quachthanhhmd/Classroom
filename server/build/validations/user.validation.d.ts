import 'reflect-metadata';
import Joi from "joi";
export declare class UserValidation {
    getUser(): Joi.ObjectSchema<any>;
    getCourseUser(): Joi.ObjectSchema<any>;
    UpdateProfile(): {
        body: Joi.ObjectSchema<any>;
    };
}
