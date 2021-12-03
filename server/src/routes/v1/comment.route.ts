import { Router } from "express";
import { inject, injectable } from "inversify";
import { TYPEROLE } from "../../constants";
import { CommentController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { CommentValidation } from "../../validations";

@injectable()
class CommentRoute {
    public router: Router;
    constructor(
        @inject("CommentController") private readonly _commentController: CommentController,
        @inject("Authenticate") private readonly _authenticate: Authenticate,
        @inject("CommentValidation") private readonly _commentValidation: CommentValidation
    ) {
        this.router = Router();
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(
            "/",
            this._authenticate.authenticate(),
            validate(this._commentValidation.CreateComment()),
            this._commentController.createComment
        )

        this.router.delete(
            "/:commentId/course/:courseId",
            this._authenticate.authenticate(),
            validate(this._commentValidation.DeleteComment()),
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            this._commentController.deleteComment
        )
    }
}

export default CommentRoute;