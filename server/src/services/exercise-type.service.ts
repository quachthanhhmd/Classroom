import { injectable } from "inversify";
import { col, fn } from "sequelize";
import { ICreateType, IUpdateOrder } from "../interfaces";
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

        const numOfRow = await ExerciseType.findAll({
            attributes: [[
                fn("max", col("orderIndex")), "orderIndex"
            ]],
            where: {
                courseId
            }
        });

        return <number> numOfRow[0].orderIndex + 1;
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
     * Update Order index
     * @param updateList 
     */
    public updateOrderIndex = async (updateList: IUpdateOrder[]): Promise<void> => {
        await Promise.all(updateList.map(async (item) => {
            await ExerciseType.update({
                orderIndex: item.orderIndex,
            }, {
                where: {
                    id: item.id
                }
            })
        }))
    }
    /**
     * Find all exercise type
     * @param courseId 
     * @returns 
     */
    public findAllExerciseDetail = async (courseId: number): Promise<ExerciseType[]> => {
        return ExerciseType.findAll({
            where: {
                courseId
            },
            order: [
                ["orderIndex", "ASC"],
            ],
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

    public findAllExerciseTypeByCourseId = async (courseId: number) => {
        return ExerciseType.findAll({
            where: {
                courseId
            },
            raw: false,
            nest: false,
        })
    }
}