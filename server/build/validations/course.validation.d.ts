import Joi from 'joi';
import "reflect-metadata";
export declare class CourseValidation {
    constructor();
    addCourse: () => Joi.ObjectSchema<any>;
    getCourse: () => Joi.ObjectSchema<any>;
}
