import { ForbiddenException, Injectable } from "@nestjs/common";
import * as  argon from 'argon2';

import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "crypto";
import { User } from "@prisma/client";

@Injectable()
export class AuthService
{
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto)
    {
        const hash = await argon.hash(dto.password);

        try
        {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email, hash,
                }, select: {
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
        if(!pwdMatches)
            throw new ForbiddenException('Credentials incorrect');

        //send back the user
        delete user.hash;

        return user;
    }
}