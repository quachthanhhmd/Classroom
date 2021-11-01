import "reflect-metadata";
import { IOAuthRequest } from "../interfaces";
import { OAuth } from "../models";
export declare class OAuthService {
    constructor();
    /**
     *
     * @param {number} userId
     * @param {string} uid
     * @returns {Promise<OAuth | null>}
     */
    findOAuthByUserIdAndUId: (userId: number, uid: string) => Promise<OAuth | null>;
    /**
     * Create New OAuth connection
     * @param {number} userId
     * @param {IOAuthRequest} bodyOAuth
     * @returns {Promise<OAuth | null> }
     */
    createNewOAuth: (userId: number, bodyOAuth: IOAuthRequest) => Promise<OAuth | null>;
    /**
     * Check or Create OAuth
     * @param {number} userId
     * @param {IOAuthRequest} bodyOAuth
     * @returns {Promise<OAuth | null> }
     */
    checkOrCreateOAuth: (userId: number, bodyOAuth: IOAuthRequest) => Promise<OAuth | null>;
}
