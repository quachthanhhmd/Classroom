import { Sequelize } from "sequelize-typescript";
import {
  Attachment, Comment, Course, Exercise, ExerciseType, Feed, Member, OAuth, Token, Topic, User } from "../models";
import env from "./env";

export const sequelize = new Sequelize({
  database: env.DB.DB_DATABASE_NAME,
  host: env.DB.DB_DATABASE_HOST,
  dialect: env.DB.DB_DIALECT,
  username: env.DB.DB_USERNAME,
  password: env.DB.DB_PASSWORD,
  storage: ":memory:",
  models: [Feed, User, Token, Member, Course, OAuth, Comment, Exercise, Topic, Attachment, ExerciseType],
  query: {
    raw: true,
  }
})

export const connection = () => {
  // tslint:disable-next-line:no-unused-expression
  sequelize;
}