import { Router } from "express";
import { inject, injectable } from "inversify";
import { TYPEROLE } from "../../constants";
import { ExerciseTypeController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { ExerciseTypeValidation } from "../../validations";

@injectable()
class ExerciseTypeRoute {
    public router: Router;

    constructor(
        @inject("Authenticate") private readonly _authenticate: Authenticate,
        @inject("ExerciseTypeController") private readonly _controller: ExerciseTypeController,
        @inject("ExerciseTypeValidation") private readonly _validation: ExerciseTypeValidation
    ) {
        this.router = Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.post(
            "/course/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._validation.CreateExerciseType()),
            this._controller.createExerciseType,
        )
        this.router.patch(
            "/:id/course/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._validation.CreateExerciseType),
            this._controller.updateExerciseType
        )

        this.router.delete(
            "/:id/course/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._validation.DeleteExerciseType),
            this._controller.deleteExerciseType
        )
    }
}

export default ExerciseTypeRoute;