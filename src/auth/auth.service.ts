import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import * as  argon from 'argon2';

import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, SignupDto } from "./dto";
import { EnvironmentService } from "src/environment/environment.service";

@Injectable()
export class AuthService
{
    constructor(
        private env: EnvironmentService,
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async signup(dto: SignupDto)
    {
        const hash = await argon.hash(dto.password);

        try
        {
            const user = await this.prisma.user.create({
                data: {
                    firstName:dto.firstName,
                    lastName:dto.lastName,
                    email: dto.email, 
                    hash,
                }, select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    createdAt: true,
                }
            });
            return user;
        } catch (error)
        {
            if (error instanceof PrismaClientKnownRequestError)
            {
                if (error.code = 'P2002')
                    throw new ForbiddenException('Credentials taken');
            }
        }
    }

    async signin(dto: AuthDto)
    {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });

        //if user does not exist throw exception
        if (!user)
            throw new ForbiddenException('Credentials incorrect');

        // compare passwrod
        const pwdMatches = await argon.verify(user.hash, dto.password);

        // if password incorrect throw exception
        if (!pwdMatches)
            throw new ForbiddenException('Credentials incorrect');

        //send back the user
        delete user.hash;

        return this.signToken(user.id, user.email);
    }

    private async signToken(userId: string, email: string): Promise<{ "access-token": string; }>
    {
        const payload = { sub: userId, email };
        const accessToken: string = ( await this.jwt.signAsync(payload, this.env.jwt)).toString();

        return { "access-token": accessToken };
    };
}