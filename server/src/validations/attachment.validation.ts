import { injectable } from "inversify";
import Joi from "joi";
import { FileType } from "../models";

@injectable()
export class AttachmentValidation {
    public CreateAttachment = () => {
        return Joi.object().keys({
            params: {
                feedId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            },
            body: {
                name: Joi.string(),
                type: Joi.string().valid(FileType),
                extension: Joi.string(),
                url: Joi.string().required(),
                thumbnailUrl: Joi.string(),
                description: Joi.string(),
                size: Joi.number().required(),
            }
        })
    }

    public DeleteAttachment = () => {
        return Joi.object().keys({
            params: {
                attachmentId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
            }
        })
    }

    public CreateBulk = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            },
            body: Joi.array().items({
                name: Joi.string(),
                type: Joi.string().valid(FileType),
                extension: Joi.string(),
                url: Joi.string().required(),
                thumbnailUrl: Joi.string(),
                description: Joi.string(),
                size: Joi.number().required(),
            })
        })
    }
}