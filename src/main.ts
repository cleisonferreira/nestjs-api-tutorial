import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap()
{
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  
  Logger.log("Server running http://localhost:" + port,"Bootstrap");

  await app.listen(port);
}
bootstrap();
