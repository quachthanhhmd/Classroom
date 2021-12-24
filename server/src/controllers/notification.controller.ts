import { inject, injectable } from "inversify";
import "reflect-metadata";
import { NotificationService } from "../services";
import { serializeNotify } from "./../interfaces/notification.interface";

import { IAuthorizeRequest, IResponse } from "./../interfaces";

@injectable()
export class NotificationController {
    constructor(
        @inject("NotificationService") private readonly _notificationService: NotificationService

    ) { }

    public getAllNotificationUser = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;

        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public updateNotification = async(
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const notifyId = +req.params.notifyId;

            await this._notificationService.updateNotify(notifyId);

            return res.composer.success();
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public getUserNotification = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;

            const notifyList = await this._notificationService.getAllNotificationUser(userId);

            return res.composer.success(notifyList.map(serializeNotify));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}