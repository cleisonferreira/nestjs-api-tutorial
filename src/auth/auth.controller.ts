import { Controller, Get, Post, Req } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController
{
    constructor(private authService: AuthService) { }


    @Post('singnup')
    signup(@Req() req: Request)
    {
        console.log(req.body);
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