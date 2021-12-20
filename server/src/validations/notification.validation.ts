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
}