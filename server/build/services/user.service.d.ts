import 'reflect-metadata';
import { ICreateUser, IUpdateUser } from "../interfaces";
import { Course, IPagingParams, IPagingResult, User } from "../models";
export declare class UserService {
    constructor();
    /**
     * find a user by Id
     * @param {number} id
     * @return {Promise<User | null>}
     */
    findUserById: (id: number) => Promise<User | null>;
    /**
     * Check user exists or not
     * @param {number} id
     * @returns {Promise<Boolean>}
     */
    isUserExist: (id: number) => Promise<Boolean>;
    /**
     * Find User by email
     * @param {string} email
     * @returns
     */
    findUserbyEmail: (email: string) => Promise<User | null>;
    /**
     * Create User
     * @param userBody
     * @returns
     */
    createUser: (userBody: ICreateUser) => Promise<User>;
    /**
     * Get only information of user
     * @param {number} id
     * @returns {Promise<User | null>} is information of user
     */
    getInforById: (id: number) => Promise<User | null>;
    /**
     * check password match
     * @param {string} userPassword
     * @param {string} inputPassword
     * @returns {Boolean}
     */
    isPasswordMatch: (userPassword: string, inputPassword: string) => Boolean;
    /**
    * Find list Courses
    * @param {IPagingParams} queryBody
    * @returns {Promise<IPagingResult<Course>>}
    */
    getListCourseUser: (userId: number, queryBody: IPagingParams) => Promise<IPagingResult<Course>>;
    /**
     * Update user
     * @param {number} userId
     * @param {updateUser} userBody
     */
    updateProfile: (userId: number, userBody: IUpdateUser) => Promise<void>;
}
