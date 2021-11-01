import { injectable } from "inversify";
import "reflect-metadata";
import { IOAuthRequest } from "../interfaces";
import { OAuth } from "../models";
import { Op } from "sequelize";

@injectable()
export class OAuthService {
    constructor() { }

    /**
     * 
     * @param {number} userId 
     * @param {string} uid 
     * @returns {Promise<OAuth | null>}
     */
    public findOAuthByUserIdAndUId = async (userId: number, uid: string): Promise<OAuth | null> => {
        return await OAuth.findOne({
            where: {
                [Op.and]: {
                    userId: userId,
                    uid: uid,
                }
            }
        })
    }

    /**
     * Create New OAuth connection
     * @param {number} userId 
     * @param {IOAuthRequest} bodyOAuth 
     * @returns {Promise<OAuth | null> }
     */
    public createNewOAuth = async (userId: number, bodyOAuth: IOAuthRequest): Promise<OAuth | null> => {
        return await OAuth.create({
            userId: userId,
            ...bodyOAuth,
        })
    }

    /**
     * Check or Create OAuth
     * @param {number} userId 
     * @param {IOAuthRequest} bodyOAuth 
     * @returns {Promise<OAuth | null> }
     */
    public checkOrCreateOAuth = async (userId: number, bodyOAuth: IOAuthRequest): Promise<OAuth | null> => {
        const oAuthExist = await this.findOAuthByUserIdAndUId(userId, bodyOAuth.uid);
        if (oAuthExist) {
            return await this.createNewOAuth(userId, bodyOAuth);
        }
        return null;
    }
}