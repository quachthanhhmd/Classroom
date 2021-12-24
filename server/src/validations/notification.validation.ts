import { injectable } from "inversify";
import Joi from "joi";
import "reflect-metadata";
import { MEMBERSTATE, TYPEROLE } from "../constants";

@injectable()
export class NotificationValidation {
    public updateNotification = () => {
        return Joi.object().keys({
            params: {
                notifyId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        })
    }
    public getNotification = () => {
        return Joi.object().keys({
            params: {
                notifyId: Joi.alternatives(
                    Joi.string(),
                    Joi.number(),
                )
            }
        })
    }

    public createNotification = () => {
        return Joi.object().keys({
            body: {
                content: Joi.string().required(),
                uri: Joi.string().required(),
                isRead: Joi.boolean().default(false),
                userId: Joi.number().required(),
                refType: Joi.string().required(),
                refId: Joi.number().required(),
            }
        })
    }
}