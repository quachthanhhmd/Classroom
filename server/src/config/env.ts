import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envSchema: Joi.ObjectPropertiesSchema = Joi.object()
    .keys({
        TYPE: Joi.string().valid("production", "development", "test").required(),
        PORT: Joi.number().default(3000),
        DB_DATABASE_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE_NAME: Joi.string().required(),
        DB_DIALECT: Joi.string().required(),
        DB_DATABASE_PORT: Joi.number().default(3306),
        TOKEN_SERCET: Joi.string().required(),
        TOKEN_EXPIRE_DAY: Joi.number().required(),
        TOKEN_EXPIRE_MINUTES: Joi.number().required(),
        EMAIL_USERNAME: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        CLIENT_DOMAIN: Joi.string().required(),
    })
    .unknown();

const { value: env, error } = envSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    TYPE: env.TYPE,
    PORT: env.PORT,
    DB: {
        DB_DATABASE_NAME: env.DB_DATABASE_NAME,
        DB_DATABASE_HOST: env.DB_DATABASE_HOST,
        DB_DATABASE_PORT: env.DB_DATABASE_PORT,
        DB_PASSWORD: env.DB_PASSWORD,
        DB_DIALECT: env.DB_DIALECT,
        DB_USERNAME: env.DB_USERNAME,
    },
    TOKEN: {
        TOKEN_SERCET: env.TOKEN_SERCET,
        TOKEN_EXPIRE_DAY: env.TOKEN_EXPIRE_DAY,
        TOKEN_EXPIRE_MINUTES: env.TOKEN_EXPIRE_MINUTES
    },
    EMAIL: {
        HOST: env.EMAIL_HOST,
        USERNAME: env.EMAIL_USERNAME,
        PASSWORD: env.EMAIL_PASSWORD,
    },
    CLIENT_DOMAIN: env.CLIENT_DOMAIN,
}