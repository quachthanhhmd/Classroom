import { injectable } from "inversify";
import { Op } from "sequelize";
import { ICreateComment } from "../interfaces";
import { Comment } from "../models";

@injectable()
export class CommentService {

    /**
     * Create new comment
     * @param {number} userId
     * @param {ICreateComment} body 
     * @returns 
     */
    public createComment = async (userId: number, body: ICreateComment): Promise<Comment> => {
        return Comment.create({
            userId,
            ...body
        })
    }

    /**
     * find All comment of user in type
     * @param {number} userId 
     * @param {string} refType 
     * @param {number} refId 
     * @returns 
     */
    public findAllComment = async (userId: number, refType: string, refId: number) => {
        return Comment.findAll({
            where: {
                [Op.and]: {
                    userId,
                    refId,
                    refType
                }
            }
        })
    }

    /**
     * Comment delete
     * @param id 
     */
    public deleteComment = async (id: number) => {
        await Comment.destroy({
            where: {
                id
            }
        })
    }

    /**
     * Check comment is belongs to user or not
     * @param {number} commentId 
     * @param {number} userId 
     * @returns 
     */
    public isBelongToComment = async (commentId: number, userId: number): Promise<boolean> => {
        const comment = await Comment.findOne({
            where: {
                [Op.and]: {
                    id: commentId,
                    userId,
                }
            }
        })

        return !!comment;
    }
}