import {injectable} from "inversify";
import Joi from "joi";
import { ReferenceType } from "../models";

@injectable()
export class CommentValidation {

    public CreateComment = () => {
        return Joi.object().keys({
            body: {
                content: Joi.string().required(),
                refId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ).required(),
                refType: Joi.string().valid(ReferenceType).required(),
            }
        })
    }

    public DeleteComment = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
                commentId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        })
    }
}