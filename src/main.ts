import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { EnvironmentService } from './environment/environment.service';

async function bootstrap()
{
  const app: NestApplication = await NestFactory.create(AppModule);

  const env = app.get(EnvironmentService);

  Logger.log(`Server running http://${env.app.host}:${env.app.port}`, "Bootstrap");

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(env.app.port);
}

bootstrap();
