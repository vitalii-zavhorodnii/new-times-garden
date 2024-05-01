import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { useContainer } from 'class-validator';

import { bot } from '@bot/bot';
import {
  handlePlayGameCommand,
  handleStartBotCommand
} from '@bot/commands-handlers';

import { AppModule } from '@domain/app.module';

import { MongoErrorsFilter } from '@filters/mongo-errors.filter';
import { SwaggerHelper } from '@helpers/swagger.helper';

import { PREFIX, PUBLIC_FOLDER } from '@constants/routes.constants';

bot.onText(/\/start/, handleStartBotCommand);
bot.onText(/\/play/, handlePlayGameCommand);

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*'
    // methods: 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
    // credentials: true,
    // allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Range'],
    // exposedHeaders: 'Content-Range'
  });

  app.setGlobalPrefix(PREFIX);

  app.useGlobalFilters(new MongoErrorsFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useStaticAssets(`${process.cwd()}/${PUBLIC_FOLDER}`, {
    prefix: `/${PUBLIC_FOLDER}`
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  SwaggerHelper(app);

  await app.listen(process.env.PORT ?? 4000);
})();
