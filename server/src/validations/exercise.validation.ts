import { injectable } from "inversify";
import Joi from "joi";

@injectable()
export class ExerciseValidation {
    public CreateExercise = () => {
        return Joi.object().keys({
            body: {
                title: Joi.string().required(),
                description: Joi.string(),
                deadline: Joi.date(),
                topicId: Joi.number(),
            },
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
            }
        })
    }
    public UpdateExercise = () => {
        return Joi.object().keys({
            body: {
                title: Joi.string().required(),
                description: Joi.string(),
                deadline: Joi.date(),
                topicId: Joi.number(),
            },
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
                id: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            }
        })
    }
    public DeleteExercise = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
                id: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            }
        })
    }
}