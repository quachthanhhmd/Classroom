import "reflect-metadata";
import moment from "moment";
import { Token } from "../models";
import { ITokenAttributes } from './../interfaces';
export declare class TokenService {
    constructor();
    /**
     * SAVE TOKEN IN DATABASE
     * @param {ITokenAttributes} token
     * @returns {Promise<Token>} newToken
     */
    storeToken: (token: ITokenAttributes) => Promise<Token>;
    /**
     * SAVE TOKEN IN DATABASE
     * @param {ITokenAttributes} token
     * @returns {Promise<Token>} newToken
     */
    saveToken: (tokenBody: ITokenAttributes) => Promise<Token>;
    /**
     * Generate token
     * @param {number} id
     * @param {Moment} expire
     * @param {string} type
     * @returns {string}
     */
    generateToken: (userId: number, expire: moment.Moment, type: string) => string;
    /**
     * Verify Token
     * @param {string} tokenName
     * @param {string} type
     * @returns {Promise<Token | null>}
     */
    verifyToken: (tokenName: string, type: string) => Promise<Token | null>;
    /**
    * Generate token to verify email or forgot password
    * @param {numbser} userId
    * @returns {Promise<string>} token after generating
    */
    generateTokenVerify: (userId: number, type: string) => Promise<string>;
    /**
     * generate token to authenticate
     * @param {User} user
     * @returns {<Promise<Object>} access and fresh token
     */
    generateTokenAuth: (userId: number) => Promise<{
        access: {
            token: string;
            expire: moment.Moment;
        };
        refresh: {
            token: string;
            expire: moment.Moment;
        };
    }>;
    /**
     * REMOVE TOKEN BY TOKEN AND TYPE
     * @param {string} token
     * @param {string} type
     * @return {Promise<void>}
     */
    removeToken: (token: string, type: string) => Promise<void>;
    /**
     * Remove token by User Id and type
     * @param {number} userId
     * @param {string} type
     * @return {Promise<void>}
     */
    removeTokenByUserId: (userId: number, type: string) => Promise<void>;
}
