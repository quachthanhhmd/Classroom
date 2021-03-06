import express from "express";
// Swagger 
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "../../docs/swaggerOption";

const router: express.Router = express.Router();

const swaggerDocument = swaggerJsDoc(options);
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;