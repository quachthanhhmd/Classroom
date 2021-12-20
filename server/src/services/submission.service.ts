import { injectable } from "inversify";
import { Op } from "sequelize";
import { IUpdateSubmission } from "../interfaces";
import { Submission, SubmissionType, User } from "../models";

@injectable()
export class SubmissionService {

    /**
     * Find submission by Id
     * @param {number} id 
     * @returns 
     */
    public findSubmissionById = async (id: number) => {
        return Submission.findByPk(id);
    }

    /**
     * Find All submission of exercise 
     * @param exerciseId 
     * @returns 
     */
    public findAllSubmissionExercise = async (exerciseId: number) => {
        return Submission.findAll({
            where: {
                [Op.and]: {
                    exerciseId,
                    type: {
                        [Op.ne]: SubmissionType.CANCELLED
                    }
                }
            },
            include: [{
                model: User,
            }],
            raw: false,
            nest: false,
        });
    }

    /**
     * Create new Submission
     * @param {number} exerciseId 
     * @param {number} userId 
     * @param {string} type 
     * @returns 
     */
    public createSubmission = async (
        exerciseId: number, userId: number, type = SubmissionType.SUBMITTED): Promise<Submission> => {
        return Submission.create({
            exerciseId,
            userId,
            type
        });
    }

    /**
     * 
     * @param userId 
     * @param exerciseIdList 
     * @returns 
     */
    public findSubmissionByExerciseId = async (userId: number, exerciseIdList: number[]) => {
        return Submission.findAll({
            where: {
                [Op.and]: {
                    userId,
                    exerciseId: [...exerciseIdList],
                    type: {
                        [Op.ne]: SubmissionType.CANCELLED
                    }
                }
            }
        });
    }

    /**
     * 
     * @param {number} submissionId 
     * @param {number} userId 
     * @param body 
     */
    public updateSubmission = async (submissionId: number, body: IUpdateSubmission): Promise<void> => {
        console.log(body);
        console.log(submissionId);
        await Submission.update(
            body,
            {
                where: {
                    id: submissionId,
                }
            }
        );
    }

    /**
     * Delete Submission
     * @param submissionId 
     */
    public deleteSubmission = async (submissionId: number) => {
        await Submission.destroy({
            where: {
                id: submissionId
            }
        });
    }

    /**
     * 
     * @param submissionId 
     * @param userId 
     * @returns 
     */
    public isBelongsToUser = async (submissionId: number, userId: number): Promise<boolean> => {
        const submission = await Submission.findOne({
            where: {
                id: submissionId,
                userId
            }
        });

        return !!submission;
    }

    public findByUserId = async (userId: number, exerciseId: number): Promise<Submission | null> => {
        return Submission.findOne({
            where: {
                [Op.and]: {
                    userId,
                    exerciseId,
                }
            }
        });
    }

    /**
     * 
     * @param {number} exerciseId 
     * @returns 
     */
    public findAllScoreInExercise = async (exerciseId: number): Promise<Submission[]> => {
        return Submission.findAll({
            where: {
                [Op.and]: {
                    // need to check type
                    exerciseId,
                }
            },
            attributes: ["id", "exerciseId", "score", "userId"],
            raw: true,
            nest: false,
        });
    }
}
