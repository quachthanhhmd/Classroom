import {Router} from "express";
import { inject, injectable } from "inversify";
import { TYPEROLE } from "../../constants";
import { SubmissionController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { SubmissionValidation } from "../../validations";

@injectable()
class SubmissionRoute {
    public router: Router;
    constructor(
        @inject("SubmissionController") private _controller: SubmissionController,
        @inject("SubmissionValidation") private _validation: SubmissionValidation,
        @inject("Authenticate") private readonly _authenticate: Authenticate
    ) {
        this.router = Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(
            "/course/:courseId/exercise/:exerciseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            validate(this._validation.getSubmission),
            this._controller.getSubmission

        )
        this.router.post(
            "/course/:courseId/exercise/:exerciseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            // validate(this._validation.CreateSubmission),
            this._controller.createNewSubmission,
        )

        this.router.patch(
            "/:submissionId/course/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._validation.UpdateSubmission),
            this._controller.updateSubmission
        )

        this.router.patch(
            "/:submissionId/course/:courseId/score",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._validation.UpdateScore),
            this._controller.updateSubmission
        )
    }
}

export default SubmissionRoute;