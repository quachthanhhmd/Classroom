"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Swagger 
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOption_1 = require("../../docs/swaggerOption");
const router = express_1.default.Router();
const swaggerDocument = (0, swagger_jsdoc_1.default)(swaggerOption_1.options);
router.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
exports.default = router;
//# sourceMappingURL=docs.route.js.map