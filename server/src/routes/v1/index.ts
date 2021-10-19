import {Router} from "express";

import env from "../../config/env";

import userRoutes from "./user.route";

class IndexRoutes  {

    router = Router();
    constructor() {
        this.InitializeRoutes();
    }

    private InitializeRoutes() {

       
    }
}


export default new IndexRoutes().router;