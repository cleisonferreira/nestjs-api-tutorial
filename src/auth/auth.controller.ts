import { Controller, Get, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController
{
    constructor(private authService: AuthService) { }

    @Post('singnin')
    signin()
    {
        return this.authService.signin();
    }

    @Post('singnup')
    signup()
    {
        return this.authService.signup();
    }

    @Get('test')
    test()
    {
        return this.authService.signup();
    }
}