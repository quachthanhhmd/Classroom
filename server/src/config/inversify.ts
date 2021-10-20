import "reflect-metadata";

import { Container } from "inversify";

import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";

import AuthController from "../controllers/auth.controller";
import AuthValidation from "../validations/auth.validation";
const container = new Container({defaultScope: "Singleton"});

container.bind<AuthController>("AuthController").to(AuthController);
container.bind<AuthValidation>("AuthValidation").to(AuthValidation);

container.bind<UserService>("UserService").to(UserService);
container.bind<UserController>("UserController").to(UserController);


export default container;