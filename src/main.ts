import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = config.get<string>('server.port');

  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '500mb' }));
  app.use(urlencoded({ extended: true, limit: '500mb' }));

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
