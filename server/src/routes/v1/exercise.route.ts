import { Router } from "express";
import { inject, injectable } from "inversify";
import { TYPEROLE } from "../../constants";
import { ExerciseController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { ExerciseValidation } from "../../validations";

@injectable()
class ExerciseRoute {
    public router: Router;

    constructor(
        @inject("Authenticate") private readonly _authenticate: Authenticate,
        @inject("ExerciseController") private readonly _exerciseController: ExerciseController,
        @inject("ExerciseValidation") private readonly _exerciseValidation: ExerciseValidation
    ) {
        this.router = Router();
        this.initializeRoutes();
    }
    public initializeRoutes(): void {

        this.router.get(
            "/:exerciseId/course/:courseId/export-grade-exercise",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._exerciseValidation.exportGradeInExercise),
            this._exerciseController.exportGradeInExercise
        );
        this.router.post(
            "/:exerciseId/course/:courseId/import-grade-exercise",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._exerciseValidation.importGradeInExercise),
            this._exerciseController.uploadGradeFromSheet
        )

        this.router.get(
            "/course/:courseId/post/:postId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            validate(this._exerciseValidation.getOneExercise),
            this._exerciseController.getOneExercise
        );
        this.router.get(
            "/course/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(...Object.values(TYPEROLE)),
            validate(this._exerciseValidation.getAll),
            this._exerciseController.getAllExercise
        );

        this.router.get(
            "/course/:courseId/deadline",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.STUDENT),
            validate(this._exerciseValidation.getDeadlineList),
            this._exerciseController.getDeadlineList
        );

        this.router.post(
            "/course/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._exerciseValidation.CreateExercise()),
            this._exerciseController.createNewExercise,
        );
        this.router.patch(
            "/:id/course/:courseId",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._exerciseValidation.UpdateExercise()),
            this._exerciseController.updateExercise
        );
        this.router.delete(
            "/:id/course/:courseId/",
            this._authenticate.authenticate(),
            this._authenticate.courseAuthentication(TYPEROLE.TEACHER, TYPEROLE.ASSISTANT),
            validate(this._exerciseValidation.DeleteExercise()),
            this._exerciseController.deleteExercise
        );

    }
}

export default ExerciseRoute;
