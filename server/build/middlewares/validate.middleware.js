"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const pick_1 = __importDefault(require("../utils/pick"));
const validate = (schema) => (req, res, next) => {
    const spreadSchema = (0, pick_1.default)(schema, ["params", "query", "body"]);
    const getObject = (0, pick_1.default)(req, Object.keys(spreadSchema));
    const { value, error } = joi_1.default.compile(spreadSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(getObject);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return res.composer.badRequest(errorMessage);
    }
    Object.assign(req, value);
    return next();
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map