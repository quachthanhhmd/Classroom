import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Op } from "sequelize";
import { CommentService } from ".";
import { Exercise, ExerciseType, ReferenceType, Topic, User } from "../models";
import { ICreateExercise } from "./../interfaces";

@injectable()
export class ExerciseService {
    constructor(
        @inject("CommentService") private readonly _commentService: CommentService
    ) {

    }
    /**
     * Find one exercise by id
     * @param id 
     * @returns 
     */
    public findExerciseById = async (id: number) => {
        return Exercise.findByPk(id);
    }

    /**
     * 
     * @param courseId 
     * @param userId 
     * @param date 
     * @returns 
     */
    public findAfterDate = async (courseId: number, userId: number, date: Date) => {
        return Exercise.findAll({
            where: {
                [Op.and]: {
                    courseId,
                    userId,
                    deadline: {
                        [Op.gte]: date,
                    }
                }
            }
        })
    }

    /**
     * 
     * @param courseId 
     * @returns 
     */
    public getAllExerciseInCourse = async (courseId: number): Promise<any[]> => {
        const exerciseList = await Exercise.findAll({
            where: {
                courseId
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "avatarUrl", "firstName", "lastName"],
                }
            ],
            order: [["createdAt", "DESC"]],
            raw: true,
            nest: true,
        })

        return Promise.all(exerciseList.map(async (feed) => {
            const allComment = await this._commentService.findCommentByRefType(ReferenceType.EXERCISE, feed.id);

            return { ...feed, commentList: allComment }
        }))
    }

    public findAllInfoById = async (id: number) => {
        return Exercise.findOne({
            where: { id },
            include: [
                {
                    model: Topic,
                    attributes: ["id", "topic"]
                },
                {
                    model: ExerciseType,
                    attributes: ["id", "name"],
                },
                {
                    model: User,
                }
            ],
            raw: true,
            nest: true,
        })
    }

    /**
     * Find All exercise by courseId
     * @param courseId 
     * @returns 
     */
    public findAllExerciseByCourseId = async (courseId: number): Promise<Exercise[]> => {
        return Exercise.findAll({
            where: {
                courseId
            },
            order: [["createdAt", "ASC"]],
            raw: true,
            nest: false
        })
    }
    /**
     * Create new Exercise
     * @param topicId 
     * @param courseId 
     * @param body 
     * @returns 
     */
    public createExercise = async (ownerId: number, courseId: number, body: ICreateExercise) => {
        return Exercise.create({
            ownerId,
            courseId,
            ...body
        })
    }

    /**
     * Update information of exercise   
     * @param id 
     * @param body 
     * @returns 
     */
    public updateExercise = async (id: number, body: ICreateExercise) => {
        return Exercise.update(
            body,
            {
                where: {
                    id,
                }
            }
        )
    }
    /**
     * Delete Exercise
     * @param id 
     */
    public deleteExercise = async (id: number): Promise<number> => {
        return Exercise.destroy({
            where: {
                id
            }
        })
    }
}