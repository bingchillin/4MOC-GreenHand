import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {jwtConstants} from './constants';
import {Request as RequestType} from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {name: payload.name, email: payload.email};
    }

    private static extractJWT(req: RequestType): string | null {
        if (
            req.cookies
            && 'user_token' in req.cookies
            && req.cookies.user_token.length > 0
        ) {
            return req.cookies.user_token;
        }
        return null;
    }
}