"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const constants_1 = require("./../constants");
require("reflect-metadata");
const passport_1 = __importDefault(require("passport"));
const inversify_1 = require("inversify");
let Authenticate = class Authenticate {
    constructor() {
        this.verifyCallback = (req, res, resolve) => (err, user, info) => __awaiter(this, void 0, void 0, function* () {
            if (err || info || !user)
                return res.composer.unauthorized(constants_1.UNAUTHENTICATED);
            req.currentUser = user;
            resolve();
        });
        /**
         * Function to autheticate role for user when try to connect any url which must use authetication.
         * Remenber that if you want to have more Role, you can add an array as a parameter in function below
         * And pass them in the head function.
         */
        this.authenticate = () => (req, res, next) => {
            return new Promise((resolve, reject) => {
                passport_1.default.authenticate('jwt', { session: false }, this.verifyCallback(req, res, resolve))(req, res, next);
            })
                .then(() => next())
                .catch((err) => next(err));
        };
    }
};
Authenticate = __decorate([
    (0, inversify_1.injectable)()
], Authenticate);
exports.Authenticate = Authenticate;
//# sourceMappingURL=auth.middleware.js.map