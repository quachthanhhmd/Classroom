import {Router} from "express";
import {inject, injectable} from "inversify";
import { FeedController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { FeedValidation } from "../../validations";

@injectable()
class FeedRoute {
    public router: Router;

    constructor(
        @inject("Authenticate") private readonly _authenticate: Authenticate,
        @inject("FeedController") private readonly _feedController: FeedController,
        @inject("FeedValidation") private readonly _feedValidation: FeedValidation,
    ) {
        this.router = Router();
        this.initializeRoutes();
    }
    public initializeRoutes() {
        this.router.post(
            "/course/:courseId",
            this._authenticate.authenticate(),
            validate(this._feedValidation.CreateFeed()),
            this._feedController.createNewFeed
        )
        this.router.patch(
            "/:feedId",
            this._authenticate.authenticate(),
            validate(this._feedValidation.UpdateFeed()),
            this._feedController.updateFeed,
        )
        this.router.delete(
            "/:feedId/course/:courseId",
            this._authenticate.authenticate(),
            validate(this._feedValidation.DeleteFeed()),
            this._feedController.deleteFeed
        )
    }
}

export default FeedRoute;