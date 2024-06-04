import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthDto, SignupDto } from "./dto";

@Controller("auth")
export class AuthController
{
    constructor(private authService: AuthService) { }

    @Post('singnup')
    signup(@Body() dto: SignupDto)
    {
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('singnin')
    signin(@Body() dto: AuthDto)
    {
        return this.authService.signin(dto);
    }

}