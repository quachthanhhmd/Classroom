import { injectable } from "inversify";
import Joi from "joi";

@injectable()
export class ExerciseValidation {

    public getDeadlineList = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        });
    }
    public getOneExercise = () => {
        return Joi.object().keys({
            params: {
                postId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        });
    }

    public getAll = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        });
    }
    public CreateExercise = () => {
        return Joi.object().keys({
            body: {
                title: Joi.string().required(),
                description: Joi.string(),
                deadline: Joi.date(),
                topic: Joi.object().keys({
                    id: Joi.number().required(),
                    topic: Joi.string(),
                }),
                typeId: Joi.number().required(),
            },
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
            }
        });
    }
    public UpdateExercise = () => {
        return Joi.object().keys({
            body: {
                title: Joi.string().required(),
                description: Joi.string(),
                deadline: Joi.date(),
                topicId: Joi.number(),
                state: Joi.string(),
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
        });
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
        });
    }

    public exportGradeInExercise = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
                exerciseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
            }
        });
    }

    public importGradeInExercise = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
                exerciseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
            },
            body: {
                url: Joi.string().required()
            }
        });
    }
}
