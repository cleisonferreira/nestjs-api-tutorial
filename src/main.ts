import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap()
{
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  
  Logger.log("Server running http://localhost:" + port,"Bootstrap");

  app.useGlobalPipes(new ValidationPipe({whitelist:true}));

  await app.listen(port);
}
bootstrap();
