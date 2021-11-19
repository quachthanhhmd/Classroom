import { injectable } from "inversify";
import "reflect-metadata";
// tslint:disable-next-line:no-submodule-imports
import { FindOptions } from "sequelize/types";
import { comparePasswordHash } from "../config";
import { MEMBERSTATE } from "../constants";
import { ICreateUser, IUpdateUser } from "../interfaces";
import { filterPagination, generateRandomPassword, Course, IPagingParams, IPagingResult, Member, User } from "../models";

@injectable()
export class UserService {

    /**
     * find a user by Id
     * @param {number} id 
     * @return {Promise<User | null>}
     */
    public findUserById = async (id: number): Promise<User | null> => {
        return User.findByPk(id);
    };

    /**
     * Check user exists or not
     * @param {number} id 
     * @returns {Promise<Boolean>}
     */
    public isUserExist = async (id: number): Promise<boolean> => {
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
        return User.findOne({
            where: {
                email,
            }
        })
    }

    /**
     * Create User
     * @param userBody 
     * @returns 
     */
    public createUser = async (userBody: ICreateUser): Promise<User> => {
        return User.create(userBody);
    }

    /**
     * Get only information of user
     * @param {number} id 
     * @returns {Promise<User | null>} is information of user
     */
    public getInforById = async (id: number): Promise<User | null> => {
        return User.findOne({
            attributes: ["id", "firstName", "lastName", "gender", "birthDay", "email", "avatarUrl"],
            where: {
                id,
            }
        })
    }

    /**
     * check password match
     * @param {string} userPassword 
     * @param {string} inputPassword 
     * @returns {Boolean}
     */
    public isPasswordMatch = (userPassword: string, inputPassword: string): boolean => {
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
                    userId,
                    type: MEMBERSTATE.ACCEPT
                }
            }],
            raw: false,
        };

        return filterPagination(Course, whereCondition, queryBody);
    }

    public createNoneUser = async (email: string) => {
        return User.create({
            email,
            password: generateRandomPassword(),
            firstName: "",
            lastName: "",
        })
    }
    /**
     * Update user
     * @param {number} userId 
     * @param {updateUser} userBody 
     */
    public updateProfile = async (userId: number, userBody: IUpdateUser): Promise<void> => {
        await User.update(
            userBody,
            {
                where: {
                    id: userId
                }
            }
        )
    }
}
