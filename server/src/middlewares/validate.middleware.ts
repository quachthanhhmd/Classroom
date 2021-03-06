import Joi from "joi";
import { INextFunction, IResponse } from "../interfaces";
import pick from "../utils/pick";

export const validate = (schema: object) => (req: any, res: IResponse, next: INextFunction) => {

    const spreadSchema = pick(schema, ["params", "query", "body"]);

    const getObject = pick(req, Object.keys(spreadSchema));

    const { value, error } = Joi.compile(spreadSchema)
        .prefs({ errors: { label: "key" } })
        .validate(getObject)

    if (error) {
        const errorMessage: string = error.details.map((details) => details.message).join(", ");

        return res.composer.badRequest(errorMessage);
    }

    Object.assign(req, value);

    return next();
}
