import { injectable } from "inversify";
import "reflect-metadata";
import { Exercise } from "../models";
import { ICreateExercise } from "./../interfaces";

@injectable()
export class ExerciseService {

    public findExerciseById = async (id: number) => {
        return Exercise.findByPk(id);
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