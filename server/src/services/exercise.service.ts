import { injectable } from "inversify";
import "reflect-metadata";
import { Exercise } from "../models";
import { ICreateExercise } from "./../interfaces";

@injectable()
export class ExerciseService {
    /**
     * Find one exercise by id
     * @param id 
     * @returns 
     */
    public findExerciseById = async (id: number) => {
        return Exercise.findByPk(id);
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
    public createExercise = async (courseId: number, body: ICreateExercise) => {
        return Exercise.create({
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