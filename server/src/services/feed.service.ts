import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CommentService } from ".";
import { IFeedCreate } from "../interfaces";
import { Feed, ReferenceType, User } from "../models";
@injectable()
export class FeedService {
    constructor(
        @inject("CommentService") private readonly _commentService: CommentService
    ) { }
    /**
     * Create new Feed
     * @param {number} courseId 
     * @param {number} userId 
     * @param {IFeedCreate} body 
     * @returns 
     */
    public createFeed = async (courseId: number, userId: number, body: IFeedCreate): Promise<Feed> => {
        return Feed.create({
            courseId,
            userId,
            ...body,
        })
    }
    /**
     * Find feed
     * @param feedId 
     * @returns 
     */
    public findFeedById = async (feedId: number) => {
        return Feed.findOne({
            where: {
                id: feedId
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["avatarUrl", "firstName", "lastName"],
                }
            ],
            raw: false,
            nest: true,
        }
        );
    }

    public isBelongsToFeed = async (feedId: number, userId: number) => {
        const feed = await this.findFeedById(feedId);
        if (!feed) return false;

        if (feed.userId !== userId) return false;

        return true;
    }
    /**
     * Update feed of user
     * @param {number} id 
     * @param {IFeedCreate} body 
     */
    public updateFeed = async (id: number, body: IFeedCreate): Promise<void> => {
        await Feed.update(
            body,
            {
                where: {
                    id
                }
            }
        )
    }

    /**
     * Delete Feed
     * @param {number} id 
     * @returns 
     */
    public deleteFeed = async (id: number): Promise<number> => {
        return Feed.destroy({
            where: {
                id
            }
        })
    }
    /**
     * 
     * @param feedId 
     * @returns 
     */
    public getAllInfoFeed = async (feedId: number): Promise<Feed | null> => {
        return Feed.findOne({
            where: {
                id: feedId,
            },
        })
    }

    /**
     * Find all feed and sort by time
     * @param courseId 
     * @returns 
     */
    public getAllFeedInCourse = async (courseId: number): Promise<any[]> => {
        const feedList = await Feed.findAll({
            where: {
                courseId
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["avatarUrl", "firstName", "lastName"],
                }
            ],
            order: [["createdAt", "DESC"]],
            raw: true,
            nest: true,
        })

        return Promise.all(feedList.map(async (feed) => {
            const allComment = await this._commentService.findCommentByRefType(ReferenceType.FEED, feed.id);

            return { ...feed, commentList: allComment }
        }))
    }
}