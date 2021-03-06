import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import moment from "moment";
import "reflect-metadata";
import { Op } from "sequelize";
import env from "../config/env";
import { TYPETOKEN } from "../constants";
import { Token } from "../models";
import { IPayload, ITokenAttributes } from "./../interfaces";

@injectable()
export class TokenService {

    /**
     * SAVE TOKEN IN DATABASE
     * @param {ITokenAttributes} token 
     * @returns {Promise<Token>} newToken
     */
    public storeToken = async (token: ITokenAttributes): Promise<Token> => {

        return Token.create({
            token: token.token,
            userId: token.userId,
            type: token.type,
            expire: token.expires.toDate(),
        });
    }

    /**
     * SAVE TOKEN IN DATABASE
     * @param {ITokenAttributes} token 
     * @returns {Promise<Token>} newToken
     */
    public saveToken = async (tokenBody: ITokenAttributes): Promise<Token> => {
        return Token.create({
            token: tokenBody.token,
            userId: tokenBody.userId,
            type: tokenBody.type,
            expire: tokenBody.expires.toDate(),
        });

    }

    /**
     * Generate token
     * @param {number} id 
     * @param {Moment} expire 
     * @param {string} type 
     * @returns {string}
     */
    public generateToken = (userId: number, expire: moment.Moment, type: string): string => {
        const payload: IPayload = {
            sub: userId,
            iat: moment().unix(),
            exp: expire.unix(),
            type,
        };

        return jwt.sign(payload, env.TOKEN.TOKEN_SERCET);
    }

    /**
     * Verify Token
     * @param {string} tokenName 
     * @param {string} type 
     * @returns {Promise<Token | null>}
     */
    public verifyToken = async (tokenName: string, type: string): Promise<Token | null> => {
        const payload = jwt.verify(tokenName, env.TOKEN.TOKEN_SERCET);
        const userId = payload.sub === undefined ? -1 : +payload.sub;

        if (userId === -1) return null;

        const tokenDoc = await Token.findOne({
            where: {
                [Op.and]: [
                    { userId },
                    { token: tokenName },
                    { type }
                ]
            }
        });

        if (!tokenDoc)
            return null;

        // After verify, we need to remove it out of DB
        // Check again
        await this.removeToken(tokenName, type);

        return tokenDoc;
    }
    /**
     * Generate token to verify email or forgot password
     * @param {number} userId 
     * @param {string} role
     * @returns {Promise<string>} 
     */
    public generateTokenVerify = async (userId: number, type: string): Promise<string> => {

        // before generateToken we need to remove token has been send before
        await this.removeTokenByUserId(userId, type);

        const tokenExpire: moment.Moment = moment().add(env.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");
        const token = this.generateToken(userId, tokenExpire, type);
        await this.storeToken({
            userId,
            token,
            expires: tokenExpire,
            type,
        });

        return token;
    }

    /**
     * generate token to authenticate
     * @param {User} user 
     * @returns {<Promise<Object>} access and fresh token
     */
    public generateTokenAuth = async (userId: number) => {
        const tokenExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");
        const generateAccessToken = this.generateToken(userId, tokenExpire, TYPETOKEN.ACCESS);

        const tokenRefreshExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_DAY, "days");
        const generateRefreshExpire = this.generateToken(userId, tokenRefreshExpire, TYPETOKEN.REFRESH);

        await this.storeToken({
            userId,
            token: generateRefreshExpire,
            expires: tokenRefreshExpire,
            type: TYPETOKEN.REFRESH,
        });

        return {
            access: {
                token: generateAccessToken,
                expire: tokenExpire,
            },
            refresh: {
                token: generateRefreshExpire,
                expire: tokenRefreshExpire
            }
        }
    }
    /**
     * Generate token to invite member to class 
     * @param userId 
     * @returns 
     */
    public generateTokenInvite = (userId: number) => {
        const tokenRefreshExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_DAY, "days");

        return this.generateToken(userId, tokenRefreshExpire, TYPETOKEN.REFRESH);
    }

    public isMatchTokenIdInvite = (tokenName: string, userId: number): boolean => {
        const payload = jwt.verify(tokenName, env.TOKEN.TOKEN_SERCET);

        const id = payload.sub === undefined ? -1 : +payload.sub;

        if (id === -1 || id !== userId) return false;

        return true;
    }

    /**
     * REMOVE TOKEN BY TOKEN AND TYPE
     * @param {string} token 
     * @param {string} type
     * @return {Promise<void>} 
     */
    public removeToken = async (token: string, type: string): Promise<void> => {

        await Token.destroy({
            where: {
                [Op.and]: {
                    token,
                    type,
                }
            }
        });
    }

    /**
     * Remove token by User Id and type
     * @param {number} userId 
     * @param {string} type 
     * @return {Promise<void>}
     */
    public removeTokenByUserId = async (userId: number, type: string): Promise<void> => {
        await Token.destroy({
            where: {
                [Op.and]: {
                    userId,
                    type,
                }
            }
        })
    }
}