import { Router } from "express";

import { container } from "../../config/inversify";
import env from "../../config/env";

import DocsRoutes from "./docs.route";
import UserRoutes from "./user.route";
import AuthRoutes from "./auth.route";
import CourseRoutes from "./course.route";

class IndexRoutes {

    router = Router();

    constructor() {
        this.InitializeRoutes();
    }

    private InitializeRoutes() {

        this.router.use("/auth", container.resolve<AuthRoutes>(AuthRoutes).router);
        this.router.use("/user", container.resolve<UserRoutes>(UserRoutes).router);
        this.router.use("/course", container.resolve<CourseRoutes>(CourseRoutes).router);

        if (env.TYPE === "development") {
            this.router.use("/docs", DocsRoutes);
        }
    }
}

export default new IndexRoutes().router;