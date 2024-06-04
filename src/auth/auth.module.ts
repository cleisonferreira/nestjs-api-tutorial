import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

import { JwtStategy } from "./strategy";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [
        PrismaModule, 
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStategy]
})
export class AuthModule
{

}