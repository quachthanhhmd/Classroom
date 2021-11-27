import { injectable } from "inversify";
import { ICreateType } from "../interfaces";
import { ExerciseType } from "../models";

@injectable()
export class ExerciseTypeService {

    /**
     * Find type by Id
     * @param {number} id 
     * @returns 
     */
    public findExerciseTypeById = async (id: number): Promise<ExerciseType | null> => {
        return ExerciseType.findByPk(id);
    }

    /**
     * generate new index Id
     * @param courseId 
     * @returns 
     */
    public generateNewOrderIndex = async (courseId: number) => {

        const numOfRow = await ExerciseType.count({
            where: {
                courseId,
            }
        })

        return numOfRow + 1;
    }
    /**
     * Create Exercise Type
     * @param {ICreateType} body 
     * @returns 
     */
    public createExerciseType = async (courseId: number, body: ICreateType): Promise<ExerciseType> => {
        return ExerciseType.create({
            ...body,
            courseId
        })
    }
    /**
     * Update Exercise Type
     * @param {number} id 
     * @param {ICreateType} body 
     */
    public updateExerciseType = async (id: number, body: ICreateType) => {
        await ExerciseType.update(
            body,
            {
                where: {
                    id
                }
            }
        )
    }
    public deleteExerciseType = async (id: number) => {
        await ExerciseType.destroy({
            where: {
                id
            }
        })
    }
}