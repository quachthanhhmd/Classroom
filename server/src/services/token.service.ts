import "reflect-metadata";

import { Op } from "sequelize";
import jwt, { JwtPayload } from "jsonwebtoken";
import moment, { parseTwoDigitYear } from "moment";
import { inject, injectable } from "inversify";

import { env } from "../config";
import { Token } from "../models";
import { ITokenAttributes, IPayload, IResponse } from './../interfaces';
import { TYPETOKEN } from "../constants";

@injectable()
export class TokenService {

    constructor() { }

    /**
     * SAVE TOKEN IN DATABASE
     * @param {ITokenAttributes} token 
     * @returns {Promise<Token>} newToken
     */
    public storeToken = async (token: ITokenAttributes): Promise<Token> => {

        const newToken = await Token.create({
            token: token.token,
            userId: token.userId,
            type: token.type,
            expire: token.expires.toDate(),
        });

        return newToken;
    }

    /**
     * SAVE TOKEN IN DATABASE
     * @param {ITokenAttributes} token 
     * @returns {Promise<Token>} newToken
     */
    public saveToken = async (tokenBody: ITokenAttributes): Promise<Token> => {
        const newToken = await Token.create({
            token: tokenBody.token,
            userId: tokenBody.userId,
            type: tokenBody.type,
            expire: tokenBody.expires.toDate(),
        });

        return newToken;
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
            type: type,
        };

        return jwt.sign(payload, env.TOKEN.TOKEN_SERCET);
    }

    /**
     * Verify Token
     * @param {string} tokenName 
     * @param {string} type 
     * @returns {Promise<Token | null>}
     */
    public verifyToken = async (tokenName: string, type: string): Promise<Token> => {
        const payload = jwt.verify(tokenName, env.TOKEN.TOKEN_SERCET);
        const userId = payload.sub === undefined ? -1 : +payload.sub;

        if (userId === -1) throw new Error();

        const tokenDoc = await Token.findOne({
            where: {
                [Op.and]: [
                    { userId: userId },
                    { token: tokenName },
                    { type: type }
                ]
            }
        });

        if (!tokenDoc)
            throw new Error();

        //After verify, we need to remove it out of DB
        //Check again
        await this.removeToken(tokenName, type);


        return tokenDoc;
    }

    /**
    * Generate token to verify email or forgot password
    * @param {numbser} userId 
    * @returns {Promise<string>} token after generating
    */
    public generateTokenVerify = async (userId: number, type: string): Promise<string> => {

        //before generateToken we need to remove token has been send before
        await this.removeTokenByUserId(userId, type);

        const tokenExpire: moment.Moment = moment().add(env.TOKEN.TOKEN_EXPIRE_MINUTES, "minutes");
        const token = this.generateToken(userId, tokenExpire, type);
        await this.storeToken({
            userId: userId,
            token: token,
            expires: tokenExpire,
            type: type,
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

        const tokenRefreshExpire = moment().add(env.TOKEN.TOKEN_EXPIRE_DAY, 'days');
        const generateRefreshExpire = this.generateToken(userId, tokenRefreshExpire, TYPETOKEN.REFRESH);

        await this.storeToken({
            userId: userId,
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
     * REMOVE TOKEN BY TOKEN AND TYPE
     * @param {string} token 
     * @param {string} type
     * @return {Promise<void>} 
     */
    public removeToken = async (token: string, type: string): Promise<void> => {


        await Token.destroy({
            where: {
                [Op.and]: {
                    token: token,
                    type: type,
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
                    userId: userId,
                    type: type,
                }
            }
        })
    }
}