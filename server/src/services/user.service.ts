import 'reflect-metadata';

import { injectable } from "inversify";
import User from "../models/user.model";

import { ICreateUser } from "../interfaces/user.interface";

import sequelize from "../config/db";


@injectable()
class UserService {

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
    
    public createUser = async (userBody: ICreateUser): Promise<User> => {

       return await User.create(userBody); 
    }
}

export default UserService;