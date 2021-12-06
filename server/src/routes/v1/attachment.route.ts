import { Router } from "express";
import { inject, injectable } from "inversify";
import { TYPEROLE } from "../../constants";
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
            "/course/:courseId/:refId/:refType",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            validate(this._attachmentValidation.CreateBulk()),
            this._attachmentController.createBulkAttachment
        )
        this.router.post(
            "/feed/:feedId",
            this._authenticate.authenticate(),
            validate(this._attachmentValidation.CreateAttachment()),
            this._attachmentController.createAttachment
        )

        this.router.post(
            "/course/:courseId",
            this._authenticate.authenticate(),
            // validate(this._attachmentValidation.DeleteAttachment),
            this._attachmentController.deleteAttachment
        )
    }
}

export default AttachmentRoute;