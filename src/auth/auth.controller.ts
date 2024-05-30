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
        console.log(dto);
        return this.authService.signup();
    }

    @Post('singnin')
    signin()
    {
        return this.authService.signin();
    }

    @Get('test')
    test()
    {
        return this.authService.signup();
    }
}