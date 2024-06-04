import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { EnvironmentService } from './environment.service';

const envFilePath = `env/.env.${process.env.NODE_ENV}`.trim();
const config: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: envFilePath
};

@Global()
@Module({
  imports: [ConfigModule.forRoot(config)],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentModule { }