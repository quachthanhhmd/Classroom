"use strict";
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
exports.jwtStrategy = void 0;
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const env_1 = __importDefault(require("./env"));
const constants_1 = require("../constants");
const services_1 = require("./../services");
const JwtOptions = {
    secretOrKey: env_1.default.TOKEN.TOKEN_SERCET,
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const verifyToken = (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload.type !== constants_1.TYPETOKEN.ACCESS) {
            return done(null, false);
        }
        const user = yield new services_1.UserService().getInforById(payload.sub);
        if (!user)
            return done(null, false);
        return done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
exports.jwtStrategy = new passport_jwt_1.default.Strategy(JwtOptions, verifyToken);
//# sourceMappingURL=passport.js.map