import passportJwt from "passport-jwt";
import { TYPETOKEN } from "../constants";
import { UserService } from "./../services";
import env from "./env";

const JwtOptions = {
    secretOrKey: env.TOKEN.TOKEN_SERCET,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verifyToken = async(payload: any, done: passportJwt.VerifiedCallback) => {

    try {
        if (payload.type !== TYPETOKEN.ACCESS) {
            return done(null, false);
        }

        const user = await new UserService().getInforById(payload.sub);

        if (!user) return done(null, false);

        return done(null, user);
    }catch (error) {
        done(error, false);
    }
}

export const jwtStrategy: passportJwt.Strategy = new passportJwt.Strategy(JwtOptions, verifyToken);
