import { Router } from "express";
import { inject, injectable } from "inversify";
import { NotificationController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { NotificationValidation } from "../../validations";

@injectable()
class NotificationRoute {
    public router: Router;
    constructor(
        @inject("Authenticate") private readonly _authenticate: Authenticate,
        @inject("NotificationValidation") private readonly _notificationValidation: NotificationValidation,
        @inject("NotificationController") private readonly _notificationController: NotificationController,

    ) {
        this.router = Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.patch(
            "/:notifyId/state",
            this._authenticate.authenticate(),
            validate(this._notificationValidation.updateNotification),
            this._notificationController.updateNotification
        )

        this.router.get(
            "/",
            this._authenticate.authenticate(),
            this._notificationController.getUserNotification
        )

        this.router.post(
            "/",
            this._authenticate.authenticate(),
            validate(this._notificationValidation.createNotification),
            this._notificationController.createNewNotification
        )
    }
}

export default NotificationRoute;