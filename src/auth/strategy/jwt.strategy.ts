import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { EnvironmentService } from "src/environment/environment.service";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, 'jwt')
{
    constructor(env: EnvironmentService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.jwt.secret
        });
    }

    validate(payload: any)
    {
        console.log({payload:payload});

        return payload;
    }
}