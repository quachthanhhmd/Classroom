import express, { Router } from 'express';

import { IRoute } from './../../interfaces';
import "reflect-metadata";
import { injectable, inject } from "inversify";

import { CourseController } from "../../controllers";
import { Authenticate, validate } from '../../middlewares';
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