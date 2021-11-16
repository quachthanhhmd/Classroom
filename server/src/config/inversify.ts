import { Container } from "inversify";
import "reflect-metadata";
import {
    AuthController,
    CommentController,
    CourseController,
    ExerciseController,
    FeedController, MemberController, UserController
} from "../controllers";
import { AttachmentController } from "../controllers/attachment.controller";
import { Authenticate } from "../middlewares";
import {
    AttachmentService,
    AuthService,
    CommentService,
    CourseService,
    ExerciseService,
    FeedService, MemberService, OAuthService, TokenService, UserService
} from "../services";
import {
    AttachmentValidation,
    AuthValidation,
    CommentValidation,
    CourseValidation,
    ExerciseValidation,
    FeedValidation,
    MemberValidation, UserValidation } from "../validations";

const existContainer = new Container({ defaultScope: "Singleton" });

existContainer.bind<Authenticate>("Authenticate").to(Authenticate);

existContainer.bind<AuthController>("AuthController").to(AuthController);
existContainer.bind<AuthValidation>("AuthValidation").to(AuthValidation);
existContainer.bind<AuthService>("AuthService").to(AuthService);

existContainer.bind<UserService>("UserService").to(UserService);
existContainer.bind<UserController>("UserController").to(UserController);
existContainer.bind<UserValidation>("UserValidation").to(UserValidation);

existContainer.bind<CourseController>("CourseController").to(CourseController);
existContainer.bind<CourseService>("CourseService").to(CourseService);
existContainer.bind<CourseValidation>("CourseValidation").to(CourseValidation);

existContainer.bind<MemberService>("MemberService").to(MemberService);
existContainer.bind<MemberController>("MemberController").to(MemberController)
existContainer.bind<MemberValidation>("MemberValidation").to(MemberValidation);

existContainer.bind<TokenService>("TokenService").to(TokenService);
existContainer.bind<OAuthService>("OAuthService").to(OAuthService);

existContainer.bind<ExerciseService>("ExerciseService").to(ExerciseService);
existContainer.bind<ExerciseController>("ExerciseController").to(ExerciseController);
existContainer.bind<ExerciseValidation>("ExerciseValidation").to(ExerciseValidation);

existContainer.bind<FeedService>("FeedService").to(FeedService);
existContainer.bind<FeedController>("FeedController").to(FeedController);
existContainer.bind<FeedValidation>("FeedValidation").to(FeedValidation);

existContainer.bind<AttachmentController>("AttachmentController").to(AttachmentController);
existContainer.bind<AttachmentValidation>("AttachmentValidation").to(AttachmentValidation);
existContainer.bind<AttachmentService>("AttachmentService").to(AttachmentService);

existContainer.bind<CommentService>("CommentService").to(CommentService);
existContainer.bind<CommentController>("CommentController").to(CommentController);
existContainer.bind<CommentValidation>("CommentValidation").to(CommentValidation);

export const container = existContainer;