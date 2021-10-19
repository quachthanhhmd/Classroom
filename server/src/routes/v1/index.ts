import {Router} from "express";

import env from "../../config/env";

import userRoutes from "./user.route";

class IndexRoutes  {

    router = Router();
    constructor() {
        this.InitializeRoutes();
    }

    private InitializeRoutes() {

        this.router.use("/user", userRoutes);
        
        if (env.TYPE === 'development'){
            this.router.use("/docs", )
        }
    }
}


export default new IndexRoutes().router;