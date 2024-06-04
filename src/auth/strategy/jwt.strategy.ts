import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

import { EnvironmentService } from "src/environment/environment.service";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, 'jwt')
{

    constructor(
        private environment: EnvironmentService,
        private prisma: PrismaService
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.jwt.secret,
            ignoreExpiration: false,
        });
    }

    async validate(payload: { sub: string, email: string; })
    {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub }
        });

        delete user.hash;

        return user;
    }
}