import { inject, injectable } from "inversify";
import Joi from "joi";
import { AttachmentValidation } from ".";

@injectable()
export class SubmissionValidation {
    constructor(
        @inject("AttachmentValidation") private readonly _attachmentValidation: AttachmentValidation,
    ) { }

    public getAllSubmission = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
                exerciseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        })
    }
    public getSubmission = () => {
        return Joi.object().keys({
            params: {
                exerciseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            }
        })
    }

    public getSubmissionDetail = () => {
        return Joi.object().keys({
            params: {
                submissionId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            }
        })
    }

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
                attachmentList: Joi.array().items(this._attachmentValidation.CreateAttachment())
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
                score: Joi.number(),
                type: Joi.string(),
            }
        })
    }

    public reviewGrade = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
                submissionId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            },
            body: {
                grade: Joi.number().required(),
                note: Joi.string(),
            }
        })
    }
}