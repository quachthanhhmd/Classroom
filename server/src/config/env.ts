import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema: Joi.ObjectPropertiesSchema = Joi.object()
    .keys({
        TYPE: Joi.string().valid('production', 'development', 'test').required(),
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
    })
    .unknown();

const { value: enviroment, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const env = {
    TYPE: enviroment.TYPE,
    PORT: enviroment.PORT,
    DB: {
        DB_DATABASE_NAME: enviroment.DB_DATABASE_NAME,
        DB_DATABASE_HOST: enviroment.DB_DATABASE_HOST,
        DB_DATABASE_PORT: enviroment.DB_DATABASE_PORT,
        DB_PASSWORD: enviroment.DB_PASSWORD,
        DB_DIALECT: enviroment.DB_DIALECT,
        DB_USERNAME: enviroment.DB_USERNAME,
    },
    TOKEN: {
        TOKEN_SERCET: enviroment.TOKEN_SERCET,
        TOKEN_EXPIRE_DAY: enviroment.TOKEN_EXPIRE_DAY,
        TOKEN_EXPIRE_MINUTES: enviroment.TOKEN_EXPIRE_MINUTES
    },
}