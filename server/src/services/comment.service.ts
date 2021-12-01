import { injectable } from "inversify";
import { Op } from "sequelize";
import { ICreateComment } from "../interfaces";
import { Comment, User } from "../models";

@injectable()
export class CommentService {

    /**
     * Find one comment by id
     * @param id 
     * @returns 
     */
    public findCommentById = async (id: number) => {
        return Comment.findOne({
            where: {
                id

            },
            include: [{
                model: User
            }],
            raw: true,
            nest: true,
        })
    }
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
     * Get one comment have Create At latest
     * @param refType 
     * @param refId 
     * @returns 
     */
    public getLatestComment = async (refType: string, refId: number) => {
        return Comment.findOne({
            where: {
                [Op.and]: {
                    refId,
                    refType
                },
            },
            include: [{
                model: User
            }],
            order: [["createdAt", "DESC"]],
            raw: true,
            nest: true,
        })
    }

    public getCommentPagination = async (refType: string, refId: number, feedId: number) => {

    }

    /**
     * find all comment in post
     * @param refType 
     * @param refId 
     * @returns 
     */
    public findCommentByRefType = async (refType: string, refId: number) => {
        return Comment.findAll({
            where: {
                [Op.and]: {
                    refId,
                    refType
                },

            },
            include: [{
                model: User
            }],
            order: [["createdAt", "ASC"]],
            raw: true,
            nest: true,
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
                },

            },
            include: [{
                model: User
            }],
            order: [["createdAt", "ASC"]],
            raw: false,
            nest: true,
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