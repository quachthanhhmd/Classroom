import 'reflect-metadata';

import Joi from "joi";
import { injectable } from 'inversify';
import { MEMBERSTATE, TYPEROLE } from '../constants';

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
    public getAllSummaryMember = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            }
        })
    }
    public inviteMemberByEmail = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            },
            body: {
                role: Joi.string().default(TYPEROLE.STUDENT).valid(TYPEROLE),
                email: Joi.string().email().required(),
            }
        })
    }

    public deleteMember = () => {
        return Joi.object().keys({
            params: {
                courseId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                ),
                userId: Joi.alternatives(
                    Joi.string(),
                    Joi.number()
                )
            },
            body: {
                state: Joi.string().default(MEMBERSTATE.BLOCKED).required(),
            }
        })
    }
}