import { Router } from "express";
import env from "../../config/env";
import { container } from "../../config/inversify";
import AttachmentRoutes from "./attachment.route";
import AuthRoutes from "./auth.route";
import CommentRoutes from "./comment.route";
import CourseRoutes from "./course.route";
import DocsRoutes from "./docs.route";
import ExerciseTypeRoutes from "./exercise-type.route";
import ExerciseRoutes from "./exercise.route"
import FeedRoutes from "./feed.route";
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
        this.router.use("/v1/exercise", container.resolve<ExerciseRoutes>(ExerciseRoutes).router);
        this.router.use("/v1/feed", container.resolve<FeedRoutes>(FeedRoutes).router)
        this.router.use("/v1/attachment", container.resolve<AttachmentRoutes>(AttachmentRoutes).router);
        this.router.use("/v1/comment", container.resolve<CommentRoutes>(CommentRoutes).router);
        this.router.use("/v1/exercise-type", container.resolve<ExerciseTypeRoutes>(ExerciseTypeRoutes).router);

        if (env.TYPE === "development") {
            this.router.use("/docs", DocsRoutes);
        }
    }
}

export default new IndexRoutes().router;