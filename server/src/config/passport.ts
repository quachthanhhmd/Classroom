import { inject, injectable } from 'inversify';
import passportJwt from "passport-jwt";

import env from "./env";
import { TYPETOKEN } from "../constants";
import { UserService } from './../services';

const JwtOptions = {
    secretOrKey: env.TOKEN.TOKEN_SERCET,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};



const verifyToken = async(payload: any, done: passportJwt.VerifiedCallback) =>{

    try {
        if (payload.type !== TYPETOKEN.ACCESS){
            throw new Error("Token is not valid!");
        }
  
        const user = await new UserService().getInforById(payload.sub);
        
        if (!user) return done(null, false);


        return done(null, user);
    }catch(error){
        done(error, false);
    }   
}


export const jwtStrategy: passportJwt.Strategy = new passportJwt.Strategy(JwtOptions, verifyToken);
