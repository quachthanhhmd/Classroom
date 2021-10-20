import "reflect-metadata";

import { Container } from "inversify";

import {
    UserService,
    TokenService,
    AuthService
} from "../services";

import {
    UserController,
    AuthController,
} from "../controllers";


import { AuthValidation } from "../validations";

const existContainer = new Container({ defaultScope: "Singleton" });

existContainer.bind<AuthController>("AuthController").to(AuthController);
existContainer.bind<AuthValidation>("AuthValidation").to(AuthValidation);
existContainer.bind<AuthService>("AuthService").to(AuthService);

existContainer.bind<UserService>("UserService").to(UserService);
existContainer.bind<UserController>("UserController").to(UserController);

existContainer.bind<TokenService>("TokenService").to(TokenService);


export const container = existContainer;