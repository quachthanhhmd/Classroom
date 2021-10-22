import { FindOptions } from 'sequelize/types';
import 'reflect-metadata';

import { injectable } from "inversify";


import { User, Course, Member } from "../models";
import { ICreateUser } from "../interfaces";
import { comparePasswordHash } from "../config";
import { filterPagination, IPagingResult, IPagingParams } from "../models";

@injectable()
export class UserService {

    constructor() { }

    /**
     * find a user by Id
     * @param {number} id 
     * @return {Promise<User | null>}
     */
    public findUserById = async (id: number): Promise<User | null> => {
        const user = await User.findByPk(id);

        return user;
    };

    /**
     * Check user exists or not
     * @param {number} id 
     * @returns {Promise<Boolean>}
     */
    public isUserExist = async (id: number): Promise<Boolean> => {
        const user = await this.findUserById(id);

        if (user)
            return true;
        return false;
    }

    /**
     * Find User by email
     * @param {string} email 
     * @returns 
     */
    public findUserbyEmail = async (email: string): Promise<User | null> => {
        const user = await User.findOne({
            where: {
                email: email,
            }
        })

        return user;
    }

    /**
     * Create User
     * @param userBody 
     * @returns 
     */
    public createUser = async (userBody: ICreateUser): Promise<User> => {
        return await User.create(userBody);
    }


    /**
     * Get only information of user
     * @param {number} id 
     * @returns {Promise<User | null>} is information of user
     */
    public getInforById = async (id: number): Promise<User | null> => {
        return await User.findOne({
            attributes: ["id", "firstName", "lastName", "gender", "birthDay", "email"],
            where: {
                id: id,
            }
        })
    }

    /**
     * check password match
     * @param {string} userPassword 
     * @param {string} inputPassword 
     * @returns {Boolean}
     */
    public isPasswordMatch = (userPassword: string, inputPassword: string): Boolean => {
        if (comparePasswordHash(userPassword, inputPassword)) return true;

        return false;
    }

    /**
    * Find list Courses
    * @param {IPagingParams} queryBody 
    * @returns {Promise<IPagingResult<Course>>}
    */
    public getListCourseUser = async (userId: number, queryBody: IPagingParams): Promise<IPagingResult<Course>> => {

        const whereCondition: FindOptions = {
            include: [{
                model: Member,
                where: {
                    userId: userId,
                }
            }],
            raw: false,
        };
        return await filterPagination(Course, whereCondition, queryBody);
    }
}
