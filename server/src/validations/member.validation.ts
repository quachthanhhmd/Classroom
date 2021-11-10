import 'reflect-metadata';

import Joi from "joi";
import { injectable } from 'inversify';

@injectable()
export class MemberValidation {
    public UpsertStudentId = () => {
        return Joi.object().keys({
            body: {
                userId: Joi.number().required(),
                courseId: Joi.number().required(),
                studentId: Joi.string().required(),
            }
        })
    }
    public getRoleMember = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            }
        })
    }
}