import  Joi  from 'joi';
import "reflect-metadata";

import { injectable, inject } from "inversify";

@injectable()
export class CourseValidation {
    constructor() { }

    public addCourse = () => {
        return Joi.object().keys({
            body: {
                name: Joi.string().required(),
                description: Joi.string(),
                topic: Joi.string(),
                studentLimit: Joi.number().min(1),
            }
        })
    }
}