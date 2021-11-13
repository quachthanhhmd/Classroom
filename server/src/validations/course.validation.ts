import { injectable } from "inversify";
import Joi from "joi";
import "reflect-metadata";
import { MEMBERSTATE } from "../constants";

@injectable()
export class CourseValidation {
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
    public getCourse = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            }
        })
    }

    public joinCourseByCode = () => {
        return Joi.object().keys({
            params: {
                code: Joi.string().required(),
            }
        })
    }

    public joinCourseByUrl = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.number().required()
            },
            query: {
                give: Joi.string().required(),
            }
        })
    }
    public joinCourseByToken = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            },
            query: {
                token: Joi.string().required(),
                role: Joi.string().valid(MEMBERSTATE).required(),
            }
        })
    }
}