import {injectable} from "inversify";
import Joi from "joi";

@injectable()
export class ExerciseTypeValidation {
    public CreateExerciseType = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            },
            body: {
                name: Joi.string().required(),
                description: Joi.string(),
            }
        })
    }
}