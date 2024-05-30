import { Global, Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

import { EnvironmentModule } from './environment/environment.module';
import { EnvironmentService } from './environment/environment.service';

@Module({
  imports: [
    EnvironmentModule,
    AuthModule, UserModule, BookmarkModule, PrismaModule
  ]
})
export class AppModule{}
