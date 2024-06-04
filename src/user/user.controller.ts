import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';


@Controller('users')
@UseGuards(JwtGuard)
export class UserController
{

    @Get('myid')
    getMyId(@GetUser('id') id: string)
    {
        return { id: id };
    }

    @Get('me')
    getMe(@GetUser() user: User)
    {
        return user;
    }

    @Patch('edit')
    editUser()
    {

    }
}
