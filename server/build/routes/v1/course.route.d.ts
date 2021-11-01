import { Router } from 'express';
import "reflect-metadata";
import { CourseController } from "../../controllers";
import { Authenticate } from '../../middlewares';
import { CourseValidation } from "../../validations";
declare class CourseRoute {
    private readonly _courseController;
    private readonly _authenticate;
    private readonly _courseValidation;
    router: Router;
    constructor(_courseController: CourseController, _authenticate: Authenticate, _courseValidation: CourseValidation);
    private initializeRoutes;
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
