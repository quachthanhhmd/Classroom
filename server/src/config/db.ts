import { Sequelize } from 'sequelize-typescript'

import env from "./env";

import { User, Token, Member, Course, OAuth } from "../models";

export const sequelize = new Sequelize({
  database: env.DB.DB_DATABASE_NAME,
  host: env.DB.DB_DATABASE_HOST,
  dialect: env.DB.DB_DIALECT,
  username: env.DB.DB_USERNAME,
  password: env.DB.DB_PASSWORD,
  storage: ':memory:',
  models: [User, Token, Member, Course, OAuth],
  query: {
    raw: true,
  }
})

export const connection = () => {
  sequelize;
  //sequelize.sync({ force: true });
}