import express, { Router } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CourseController } from "../../controllers";
import { validate, Authenticate } from "../../middlewares";
import { CourseValidation } from "../../validations";

@injectable()
class CourseRoute {
    public router: Router = express.Router();

    constructor(
        @inject("CourseController") private readonly _courseController: CourseController,
        @inject("Authenticate") private readonly _authenticate: Authenticate,
        @inject("CourseValidation") private readonly _courseValidation: CourseValidation,
    ) {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post(
            "/",
            this._authenticate.authenticate(),
            validate(this._courseValidation.addCourse),
            this._courseController.addCourse,
        );
        this.router.get(
            "/:courseId",
            this._authenticate.authenticate(),
            validate(this._courseValidation.getCourse),
            this._courseController.getCourseDetail,
        );
        this.router.post(
            "/join/:code",
            this._authenticate.authenticate(),
            validate(this._courseValidation.joinCourseByCode),
            this._courseController.joinCourseByCode,
        )

        this.router.patch(
            "/:courseId",
            this._authenticate.authenticate(),
            validate(this._courseValidation.joinCourseByUrl()),
            this._courseController.joinCourseByUrl
        )
        this.router.patch(
            "/invite/:courseId",
            this._authenticate.authenticate(),
            validate(this._courseValidation.joinCourseByToken()),
            this._courseController.checkJoinCourseToken
        )
    }

}

export default CourseRoute;

/**
 * @swagger
 * tags: 
 *   name: Course
 *   decription: All problems about courses
 */

/**
 * @swagger
 * /v1/course:
 *   post: 
 *     summary: Create a new Course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     description: Create a new Course
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: Lap trinh ung dung Web
 *               description:
 *                 type: string
 *                 example: Lap trinh ung dung web, su dung Reactjs
 *               studentLimit:
 *                 type: number
 *                 example: 80
 *               topic: 
 *                 type: string
 *                 example: LTUDW        
 *     responses: 
 *       "200":
 *         description: Success
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'           
 *       
 */