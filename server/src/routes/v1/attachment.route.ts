import { Router } from "express";
import { inject, injectable } from "inversify";
import { AttachmentController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { AttachmentValidation } from "../../validations";

@injectable()
class AttachmentRoute {
    public router: Router;

    constructor(
        @inject("Authenticate") private readonly _authenticate: Authenticate,
        @inject("AttachmentController") private readonly _attachmentController: AttachmentController,
        @inject("AttachmentValidation") private readonly _attachmentValidation: AttachmentValidation
    ) {
        this.router = Router();
        this.initializeRoutes();
    }
    public initializeRoutes(): void {
        this.router.post(
            "/feed/:feedId",
            this._authenticate.authenticate(),
            validate(this._attachmentValidation.CreateAttachment()),
            this._attachmentController.createAttachment
        )

        this.router.delete(
            "/:attachmentId",
            this._authenticate.authenticate(),
            validate(this._attachmentValidation.DeleteAttachment),
            this._attachmentController.deleteAttachment
        )
    }
}

export default AttachmentRoute;