import { inject, injectable } from "inversify";
import Joi from "joi";
import { AttachmentValidation } from ".";

@injectable()
export class SubmissionValidation {
    constructor(
        @inject("AttachmentValidation") private readonly _attachmentValidation: AttachmentValidation,
    ) {}

    public CreateSubmission = () => {
        return Joi.object().keys({
            params: {
                exerciseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                ).required(),
            },
            body: {
                type: Joi.string(),
                submissionList: this._attachmentValidation.CreateAttachment()
            }
        })
    }
    public UpdateSubmission = () => {
        return Joi.object().keys({
            params: {
                submissionId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ).required(),
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ).required(),
            },
            body: {
                type: Joi.string(),
                exerciseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        })
    }

    public UpdateScore = () => {
        return Joi.object().keys({
            params: {
                submissionId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ).required(),
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ).required(),
            },
            body: {
                score: Joi.number().required(),
            }
        })
    }
}