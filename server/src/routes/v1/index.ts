import { Router } from "express";
import env from "../../config/env";
import { container } from "../../config/inversify";
import AuthRoutes from "./auth.route";
import CourseRoutes from "./course.route";
import DocsRoutes from "./docs.route";
import MemberRoutes from "./member.route";
import UserRoutes from "./user.route";

class IndexRoutes {

    router = Router();

    constructor() {
        this.InitializeRoutes();
    }

    private InitializeRoutes() {

        this.router.use("/v1/auth", container.resolve<AuthRoutes>(AuthRoutes).router);
        this.router.use("/v1/user", container.resolve<UserRoutes>(UserRoutes).router);
        this.router.use("/v1/course", container.resolve<CourseRoutes>(CourseRoutes).router);
        this.router.use("/v1/member", container.resolve<MemberRoutes>(MemberRoutes).router);

        if (env.TYPE === "development") {
            this.router.use("/docs", DocsRoutes);
        }
    }
}

export default new IndexRoutes().router;