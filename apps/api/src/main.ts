import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { useContainer } from 'class-validator';

import { bot } from '@bot/bot';
import {
  handleConnectCommand,
  handleDisconnectCommand,
  handlePlayGameCommand,
  handleSendTXCommand,
  handleShowMyWalletCommand,
  handleStartBotCommand
} from '@bot/commands-handlers';
import { walletMenuCallbacks } from '@bot/connect-wallet-menu';
import '@bot/connect-wallet-menu';

import { AppModule } from '@domain/app.module';

import { MongoErrorsFilter } from '@filters/mongo-errors.filter';
import { SwaggerHelper } from '@helpers/swagger.helper';

import { PREFIX, PUBLIC_FOLDER } from '@constants/routes.constants';

export const callbacks = {
  ...walletMenuCallbacks
};

bot.on('callback_query', (query) => {
  const webViewLink = `https://newtimesgarden.online?id=${query.from.id}`;
  if (query.game_short_name) {
    bot.answerCallbackQuery(query.id, {
      text: 'New Times Garden',
      url: webViewLink
    });
  }
  // Parse callback data and execute corresponing function
  if (!query.data) {
    return;
  }

  let request: { method: string; data: string };

  try {
    request = JSON.parse(query.data);
  } catch {
    return;
  }

  if (!callbacks[request.method as keyof typeof callbacks]) {
    return;
  }

  callbacks[request.method as keyof typeof callbacks](query, request.data);
});

bot.onText(/\/start/, handleStartBotCommand);
bot.onText(/\/play/, handlePlayGameCommand);
bot.onText(/\/connect/, handleConnectCommand);
bot.onText(/\/send_tx/, handleSendTXCommand);
bot.onText(/\/disconnect/, handleDisconnectCommand);
bot.onText(/\/my_wallet/, handleShowMyWalletCommand);

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
