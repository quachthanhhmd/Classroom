import { injectable } from "inversify";
import Joi from "joi";

@injectable()
export class FeedValidation {
    public CreateFeed = () => {
        return Joi.object().keys({
            body: {
                content: Joi.string(),
            },
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        })
    }

    public UpdateFeed = () => {
        return Joi.object().keys({
            body: {
                content: Joi.string(),
            },
            params: {
                feedId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
            }
        })
    }

    public DeleteFeed = () => {
        return Joi.object().keys({
            params: {
                feedId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
            }
        })
    }
}