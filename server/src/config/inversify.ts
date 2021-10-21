import "reflect-metadata";

import { Container } from "inversify";

import {
    UserService,
    TokenService,
    AuthService,
    CourseService,
    MemberService
} from "../services";

import {
    UserController,
    AuthController,
    CourseController
} from "../controllers";

import { Authenticate } from "../middlewares";
import { AuthValidation, CourseValidation, UserValidation } from "../validations";

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

existContainer.bind<TokenService>("TokenService").to(TokenService);


export const container = existContainer;