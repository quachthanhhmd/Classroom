import { Sequelize } from 'sequelize-typescript'
import path from "path";

import  env  from "./env";

import {User, Token, Member, Course} from "../models";

export const sequelize = new Sequelize({
  database: env.DB.DB_DATABASE_NAME,
  dialect: env.DB.DB_DIALECT,
  username: env.DB.DB_USERNAME,
  password: env.DB.DB_PASSWORD,
  storage: ':memory:',
  models: [User, Token, Member, Course]
})