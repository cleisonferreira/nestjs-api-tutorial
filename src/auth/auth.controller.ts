import { Body, Controller, Get, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController
{
    constructor(private authService: AuthService) { }

    @Post('singnup')
    signup(@Body() dto: AuthDto)
    {
        return this.authService.signup(dto);
    }

    @Post('singnin')
    signin(@Body() dto: AuthDto)
    {
        return this.authService.signin(dto);
    }

}